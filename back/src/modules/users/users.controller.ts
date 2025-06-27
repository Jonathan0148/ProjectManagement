import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos-globals/page-options.dto';
import { ApiPaginatedResponse } from 'src/common/constanst/config-globals';
import { Role } from 'src/db/entities/role.entity';
import { ResponseTypedApis } from 'src/common/interfaces/api-response-typed.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiPaginatedResponse(Role)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<ResponseTypedApis> {
    return await this.usersService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseTypedApis> {
    return await this.usersService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateUserDto, @Request() req): Promise<ResponseTypedApis> {
    return await this.usersService.create(dto, req.user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: number, @Body() dto: UpdateUserDto, @Request() req): Promise<ResponseTypedApis> {
    return await this.usersService.updateOrSoftDeleteRol(id, req.user, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Request() req): Promise<ResponseTypedApis> {
    return await this.usersService.updateOrSoftDeleteRol(id, req.user);
  }
}
