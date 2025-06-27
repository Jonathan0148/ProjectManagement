import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos-globals/page-options.dto';
import { ApiResponseDataHelper } from 'src/common/helpers/api-response-data.helper';
import { ResponseTypedApis } from 'src/common/interfaces/api-response-typed.interface';
import { Project } from 'src/db/entities/project.entity';
import { Brackets, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserLoginDto } from 'src/common/dtos-globals/user-login.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project) private userRepository: Repository<Project>
    ) { }

    public async findAll(pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
        const queryBuilder = this.userRepository.createQueryBuilder('query')
            .where(
                new Brackets(qb => {
                    qb.where('(query.name LIKE :term)', { term: `%${pageOptionsDto.term}%` })
                })
            )
            .andWhere('query.status = :state', { state: true })
            .orderBy('query.id', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return ApiResponseDataHelper.sendSuccessPaginated(entities, pageMetaDto);
    }

    public async findOne(id: number): Promise<ResponseTypedApis> {
        const queryBuilder = this.userRepository.createQueryBuilder('query')
            .where('query.id = :id', { id })
            .andWhere('query.status = :state', { state: true });

        const entity = await queryBuilder.getOne();

        if (!entity) {
            return ApiResponseDataHelper.sendNotFound();
        }

        return ApiResponseDataHelper.sendSuccess(entity);
    }

    public async create(dto: CreateProjectDto, user: UserLoginDto): Promise<ResponseTypedApis> {
        try {
            const dataCreated = this.userRepository.create({
                name: dto.name
            });

            await this.userRepository.save(dataCreated);

            return ApiResponseDataHelper.sendCreated(dataCreated);
        } catch (error) {
            return ApiResponseDataHelper.sendError(error.message);
        }
    }

    public async updateOrSoftDeleteRol(id: number, user: UserLoginDto, dto: UpdateProjectDto | null = null): Promise<ResponseTypedApis> {
        try {
            const existingEntity = await this.userRepository.findOne({
                where: { id, status: true }
            });

            if (!existingEntity) {
                return ApiResponseDataHelper.sendNotFound();
            }

            if (!dto) {
                existingEntity.status = false;
            } else {
                existingEntity.name = dto.name;
            }

            existingEntity.updateUserId = user.userId;

            const updatedEntity = await this.userRepository.save(existingEntity);

            return ApiResponseDataHelper.sendSuccess(updatedEntity, `El registro fue ${!dto ? 'eliminado' : 'actualizado'} exitosamente`);
        } catch (error) {
            console.error(`Ocurrió un error al intentar ${!dto ? 'eliminar' : 'actualizar'} el registro: `, error);
            return ApiResponseDataHelper.sendError(`Ocurrió un error al intentar ${!dto ? 'eliminar' : 'actualizar'} el registro: ${error}`);
        }
    }
}
