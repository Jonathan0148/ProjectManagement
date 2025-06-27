import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos-globals/page-options.dto';
import { ApiPaginatedResponse } from 'src/common/constanst/config-globals';
import { Role } from 'src/db/entities/role.entity';
import { ResponseTypedApis } from 'src/common/interfaces/api-response-typed.interface';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiTags('tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get('getAllProject/:projectId')
  @ApiPaginatedResponse(Role)
  async getAllProject(@Param('projectId') projectId: number, @Query() pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
    return await this.tasksService.getAllProject(projectId, pageOptionsDto);
  }

  @Get()
  @ApiPaginatedResponse(Role)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
    return await this.tasksService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseTypedApis> {
    return await this.tasksService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateTaskDto, @Request() req): Promise<ResponseTypedApis> {
    return await this.tasksService.create(dto, req.user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto, @Request() req): Promise<ResponseTypedApis> {
    return await this.tasksService.updateOrSoftDeleteRol(id, req.user, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Request() req): Promise<ResponseTypedApis> {
    return await this.tasksService.updateOrSoftDeleteRol(id, req.user);
  }
}
