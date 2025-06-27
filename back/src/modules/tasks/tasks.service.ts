import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos-globals/page-options.dto';
import { ApiResponseDataHelper } from 'src/common/helpers/api-response-data.helper';
import { ResponseTypedApis } from 'src/common/interfaces/api-response-typed.interface';
import { Task } from 'src/db/entities/task.entity';
import { Brackets, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserLoginDto } from 'src/common/dtos-globals/user-login.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>
    ) { }

    public async getAllProject(projectId: number, pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
        const queryBuilder = this.taskRepository.createQueryBuilder('query')
            .where(
                new Brackets(qb => {
                    qb.where('(query.name LIKE :term)', { term: `%${pageOptionsDto.term}%` })
                })
            )
            .andWhere('query.status = :state', { state: true })
            .andWhere('query.projects_id = :projectId', { projectId})
            .orderBy('query.id', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return ApiResponseDataHelper.sendSuccessPaginated(entities, pageMetaDto);
    }

    public async findAll(pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
        const queryBuilder = this.taskRepository.createQueryBuilder('query')
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
        const queryBuilder = this.taskRepository.createQueryBuilder('query')
            .where('query.id = :id', { id })
            .andWhere('query.status = :state', { state: true });

        const entity = await queryBuilder.getOne();

        if (!entity) {
            return ApiResponseDataHelper.sendNotFound();
        }

        return ApiResponseDataHelper.sendSuccess(entity);
    }

    public async create(dto: CreateTaskDto, user: UserLoginDto): Promise<ResponseTypedApis> {
        try {
            const dataCreated = this.taskRepository.create({
                name: dto.name,
                projects_id: dto.projects_id,
                state: dto.state,
            });

            await this.taskRepository.save(dataCreated);

            return ApiResponseDataHelper.sendCreated(dataCreated);
        } catch (error) {
            return ApiResponseDataHelper.sendError(error.message);
        }
    }

    public async updateOrSoftDeleteRol(id: number, user: UserLoginDto, dto: UpdateTaskDto | null = null): Promise<ResponseTypedApis> {
        try {
            const existingEntity = await this.taskRepository.findOne({
                where: { id, status: true }
            });

            if (!existingEntity) {
                return ApiResponseDataHelper.sendNotFound();
            }

            if (!dto) {
                existingEntity.status = false;
            } else {
                existingEntity.name = dto.name;
                existingEntity.projects_id = dto.projects_id;
                existingEntity.state = dto.state;
            }

            existingEntity.updateUserId = user.userId;

            const updatedEntity = await this.taskRepository.save(existingEntity);

            return ApiResponseDataHelper.sendSuccess(updatedEntity, `El registro fue ${!dto ? 'eliminado' : 'actualizado'} exitosamente`);
        } catch (error) {
            console.error(`Ocurrió un error al intentar ${!dto ? 'eliminar' : 'actualizar'} el registro: `, error);
            return ApiResponseDataHelper.sendError(`Ocurrió un error al intentar ${!dto ? 'eliminar' : 'actualizar'} el registro: ${error}`);
        }
    }
}
