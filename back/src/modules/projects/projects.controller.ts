import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos-globals/page-options.dto';
import { ApiPaginatedResponse } from 'src/common/constanst/config-globals';
import { Role } from 'src/db/entities/role.entity';
import { ResponseTypedApis } from 'src/common/interfaces/api-response-typed.interface';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
@ApiTags('projects')
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  @ApiPaginatedResponse(Role)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
    return await this.projectsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseTypedApis> {
    return await this.projectsService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateProjectDto, @Request() req): Promise<ResponseTypedApis> {
    return await this.projectsService.create(dto, req.user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: number, @Body() dto: UpdateProjectDto, @Request() req): Promise<ResponseTypedApis> {
    return await this.projectsService.updateOrSoftDeleteRol(id, req.user, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Request() req): Promise<ResponseTypedApis> {
    return await this.projectsService.updateOrSoftDeleteRol(id, req.user);
  }
}
