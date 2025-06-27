import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/db/entities/role.entity';
import { CommonModule } from 'src/common/common.module';
import { FunctionalityRole } from 'src/db/entities/functionality-role.entity';
import { FunctionalityRolePermit } from 'src/db/entities/functionality-role-permit.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Role, FunctionalityRole, FunctionalityRolePermit]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
