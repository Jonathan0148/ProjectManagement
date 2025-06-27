import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos-globals/page-options.dto';
import { UserLoginDto } from 'src/common/dtos-globals/user-login.dto';
import { ApiResponseDataHelper } from 'src/common/helpers/api-response-data.helper';
import { ResponseTypedApis } from 'src/common/interfaces/api-response-typed.interface';
import { User } from 'src/db/entities/user.entity';
import { Brackets, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    public async findAll(pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
        const queryBuilder = this.userRepository.createQueryBuilder('query')
            .where(
                new Brackets(qb => {
                    qb.where('(query.names LIKE :term)', { term: `%${pageOptionsDto.term}%` })
                    qb.orWhere('(query.names LIKE :term)', { term: `%${pageOptionsDto.term}%` })
                    qb.orWhere('(query.username LIKE :term)', { term: `%${pageOptionsDto.term}%` })
                    qb.orWhere('(query.email LIKE :term)', { term: `%${pageOptionsDto.term}%` })
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

    public async create(dto: CreateUserDto, user: UserLoginDto): Promise<ResponseTypedApis> {
        try {
            const dataCreated = this.userRepository.create({
                roles_id: dto.roles_id,
                names: dto.names,
                surnames: dto.surnames,
                username: dto.username,
                password: await this.encryptPassword(`${dto.username}${new Date().getFullYear()}*`),
                email: dto.email,
                image: dto.image,
                active: dto.active,
                insertUserId: user.userId
            });

            await this.userRepository.save(dataCreated);

            return ApiResponseDataHelper.sendCreated(dataCreated);
        } catch (error) {
            return ApiResponseDataHelper.sendError(error.message);
        }
    }

    public async updateOrSoftDeleteRol(id: number, user: UserLoginDto, dto: UpdateUserDto | null = null): Promise<ResponseTypedApis> {
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
                existingEntity.roles_id = dto.roles_id;
                existingEntity.names = dto.names;
                existingEntity.surnames = dto.surnames;
                existingEntity.email = dto.email;
                existingEntity.image = dto.image;
                existingEntity.active = dto.active;
            }

            existingEntity.updateUserId = user.userId;

            const updatedEntity = await this.userRepository.save(existingEntity);

            return ApiResponseDataHelper.sendSuccess(updatedEntity, `El registro fue ${!dto ? 'eliminado' : 'actualizado'} exitosamente`);
        } catch (error) {
            console.error(`Ocurrió un error al intentar ${!dto ? 'eliminar' : 'actualizar'} el registro: `, error);
            return ApiResponseDataHelper.sendError(`Ocurrió un error al intentar ${!dto ? 'eliminar' : 'actualizar'} el registro: ${error}`);
        }
    }

    private encryptPassword(text: string): string {
        const algorithm = 'aes-256-ecb';
        const encryptionKey = process.env.ENCRYPTION_KEY ?? '';
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), null);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
}
