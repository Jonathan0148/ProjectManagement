import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos-globals/page-options.dto';
import { ApiPaginatedResponse } from 'src/common/constanst/config-globals';
import { Role } from 'src/db/entities/role.entity';
import { ResponseTypedApis } from 'src/common/interfaces/api-response-typed.interface';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Functionality } from 'src/db/entities/functionality.entity';
import { Permit } from 'src/db/entities/permit.entity';

@Controller('roles')
@UseGuards(JwtAuthGuard)
@ApiTags('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Get('getModules')
  @ApiPaginatedResponse(Functionality)
  async getModules(@Query() pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
    return await this.rolesService.getModules(pageOptionsDto);
  }

  @Get('getPermits')
  @ApiPaginatedResponse(Permit)
  async getPermits(@Query() pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
    return await this.rolesService.getPermits(pageOptionsDto);
  }

  @Get()
  @ApiPaginatedResponse(Role)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
    return await this.rolesService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseTypedApis> {
    return await this.rolesService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateRoleDto, @Request() req): Promise<ResponseTypedApis> {
    return await this.rolesService.create(dto, req.user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: number, @Body() dto: UpdateRoleDto, @Request() req): Promise<ResponseTypedApis> {
    return await this.rolesService.updateOrSoftDeleteRol(id, req.user, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Request() req): Promise<ResponseTypedApis> {
    return await this.rolesService.updateOrSoftDeleteRol(id, req.user);
  }
}
