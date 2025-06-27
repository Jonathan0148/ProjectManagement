import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos-globals/page-options.dto';
import { UserLoginDto } from 'src/common/dtos-globals/user-login.dto';
import { ApiResponseDataHelper } from 'src/common/helpers/api-response-data.helper';
import { ResponseTypedApis } from 'src/common/interfaces/api-response-typed.interface';
import { Role } from 'src/db/entities/role.entity';
import { Brackets, Repository } from 'typeorm';
import { CreateFunctionalityRoleDto, CreateFunctionalityRolePermitDto, CreateRoleDto } from './dto/create-role.dto';
import { UpdateFunctionalityRolePermitDto, UpdateRoleDto } from './dto/update-role.dto';
import { FunctionalityRole } from 'src/db/entities/functionality-role.entity';
import { FunctionalityRolePermit } from 'src/db/entities/functionality-role-permit.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(FunctionalityRole) private functionalityRoleRepository: Repository<FunctionalityRole>,
        @InjectRepository(FunctionalityRolePermit) private functionalityRolePermitRepository: Repository<FunctionalityRolePermit>
    ) { }

    public async findAll(pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
        const queryBuilder = this.roleRepository.createQueryBuilder('query')
            .leftJoinAndSelect('query.functionalityRole', 'functionalityRole')
            .leftJoinAndSelect('functionalityRole.functionalityRolePermit', 'functionalityRolePermit')
            .where(
                new Brackets(qb => {
                    qb.where('(query.name LIKE :term)', { term: `%${pageOptionsDto.term}%` })
                    qb.orWhere('(query.description LIKE :term)', { term: `%${pageOptionsDto.term}%` })
                })
            )
            .andWhere('query.active = :active', { active: true })
            .andWhere('query.status = :state', { state: true })
            .andWhere('functionalityRole.status = :state', { state: true })
            .andWhere('functionalityRolePermit.status = :state', { state: true })
            .orderBy('query.id', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return ApiResponseDataHelper.sendSuccessPaginated(entities, pageMetaDto);
    }

    public async findOne(id: number): Promise<ResponseTypedApis> {
        const queryBuilder = this.roleRepository.createQueryBuilder('query')
            .leftJoinAndSelect('query.functionalityRole', 'functionalityRole')
            .leftJoinAndSelect('functionalityRole.functionalityRolePermit', 'functionalityRolePermit')
            .where('query.id = :id', { id })
            .andWhere('query.active = :active', { active: true })
            .andWhere('query.status = :state', { state: true })
            .andWhere('functionalityRole.status = :state', { state: true })
            .andWhere('functionalityRolePermit.status = :state', { state: true });

        const entity = await queryBuilder.getOne();

        if (!entity) {
            return ApiResponseDataHelper.sendNotFound();
        }

        return ApiResponseDataHelper.sendSuccess(entity);
    }

    public async create(dto: CreateRoleDto, user: UserLoginDto): Promise<ResponseTypedApis> {
        try {
            if (dto.functionalityRole.length === 0) {
                return ApiResponseDataHelper.sendError('Debe asignar al menos un módulo al rol.');
            }

            const dataCreated = this.roleRepository.create({
                name: dto.name,
                description: dto.description,
                insertUserId: user.userId
            });

            await this.roleRepository.save(dataCreated);

            await this.createFunctionalityRole(dto.functionalityRole, dataCreated.id, user);

            return ApiResponseDataHelper.sendCreated(dataCreated);
        } catch (error) {
            console.error('Error al crear el rol:', error);
            return ApiResponseDataHelper.sendError('Error al crear el rol. Detalles: ' + error.message);
        }
    }

    private async createFunctionalityRole(dto: CreateFunctionalityRoleDto[], roleId: number, user: UserLoginDto) {
        await Promise.all(dto.map(async (element) => {
            const dataCreated = this.functionalityRoleRepository.create({
                roles_id: roleId,
                modules_id: element.functionalityId,
                insertUserId: user.userId
            });

            await this.functionalityRoleRepository.save(dataCreated);

            await this.createFunctionalityRolePermit(element.functionalityRolePermit, dataCreated.id, user);
        }));
    }

    private async createFunctionalityRolePermit(dto: CreateFunctionalityRolePermitDto[], permitId: number, user: UserLoginDto) {
        await Promise.all(dto.map(async (element) => {
            const dataCreated = this.functionalityRolePermitRepository.create({
                permits_id: element.permitId,
                modules_roles_id: permitId,
                insertUserId: user.userId
            });

            await this.functionalityRolePermitRepository.save(dataCreated);
        }));
    }

    public async updateOrSoftDeleteRol(id: number, user: UserLoginDto, dto: UpdateRoleDto | null = null): Promise<any> {
        try {
            const existingRole = await this.roleRepository.findOne({
                where: { id, status: true },
                relations: ['functionalityRole', 'functionalityRole.functionalityRolePermit']
            });

            if (!existingRole) {
                return ApiResponseDataHelper.sendNotFound();
            }

            if (!dto) {
                existingRole.status = false;
                existingRole.updateUserId = user.userId;

                if (existingRole.functionalityRole) {
                    for (const funcRole of existingRole.functionalityRole) {
                        funcRole.status = false;
                        funcRole.updateUserId = user.userId;

                        if (funcRole.functionalityRolePermit) {
                            for (const permit of funcRole.functionalityRolePermit) {
                                permit.status = false;
                                permit.updateUserId = user.userId;
                                await this.functionalityRolePermitRepository.save(permit);
                            }
                        }

                        await this.functionalityRoleRepository.save(funcRole);
                    }
                }

                await this.roleRepository.save(existingRole);
                return ApiResponseDataHelper.sendSuccess(null, 'El registro fue eliminado exitosamente');
            }

            existingRole.name = dto.name;
            existingRole.description = dto.description;
            existingRole.updateUserId = user.userId;
            await this.roleRepository.save(existingRole);

            const existingFuncRoles = await this.functionalityRoleRepository.find({
                where: { roles_id: id },
                relations: ['functionalityRolePermit']
            });

            const dtoFuncRoles = dto.functionalityRole;

            for (const funcDto of dtoFuncRoles) {
                const existing = existingFuncRoles.find(f => f.id === funcDto.id);

                if (existing) {
                    existing.modules_id = funcDto.functionalityId;
                    existing.updateUserId = user.userId;
                    existing.status = true;
                    await this.functionalityRoleRepository.save(existing);

                    await this.handleFunctionalityRolePermits(existing.id, funcDto.functionalityRolePermit, existing.functionalityRolePermit, user);
                } else {
                    const newFunc = this.functionalityRoleRepository.create({
                        roles_id: id,
                        modules_id: funcDto.functionalityId,
                        insertUserId: user.userId
                    });

                    const savedFunc = await this.functionalityRoleRepository.save(newFunc);
                    await this.handleFunctionalityRolePermits(savedFunc.id, funcDto.functionalityRolePermit, [], user);
                }
            }

            const dtoIds = dtoFuncRoles.filter(f => f.id).map(f => f.id);
            for (const func of existingFuncRoles) {
                if (!dtoIds.includes(func.id)) {
                    func.status = false;
                    func.updateUserId = user.userId;

                    if (func.functionalityRolePermit) {
                        for (const permit of func.functionalityRolePermit) {
                            permit.status = false;
                            permit.updateUserId = user.userId;
                            await this.functionalityRolePermitRepository.save(permit);
                        }
                    }

                    await this.functionalityRoleRepository.save(func);
                }
            }

            return ApiResponseDataHelper.sendSuccess(existingRole, 'El rol fue actualizado exitosamente');
        } catch (error) {
            console.error(`Error al actualizar o eliminar el rol:`, error);
            return ApiResponseDataHelper.sendError(`Ocurrió un error: ${error.message}`);
        }
    }

    private async handleFunctionalityRolePermits(functionalityRoleId: number, dto: UpdateFunctionalityRolePermitDto[], existingPermits: FunctionalityRolePermit[], user: UserLoginDto) {
        const dtoIds = dto.filter(p => p.id).map(p => p.id);

        for (const permitDto of dto) {
            const existing = existingPermits.find(p => p.id === permitDto.id);

            if (existing) {
                existing.permits_id = permitDto.permitId;
                existing.status = true;
                existing.updateUserId = user.userId;
                await this.functionalityRolePermitRepository.save(existing);
            } else {
                const created = this.functionalityRolePermitRepository.create({
                    permits_id: permitDto.permitId,
                    modules_roles_id: functionalityRoleId,
                    insertUserId: user.userId
                });
                await this.functionalityRolePermitRepository.save(created);
            }
        }

        for (const permit of existingPermits) {
            if (!dtoIds.includes(permit.id)) {
                permit.status = false;
                permit.updateUserId = user.userId;
                await this.functionalityRolePermitRepository.save(permit);
            }
        }
    }
}
