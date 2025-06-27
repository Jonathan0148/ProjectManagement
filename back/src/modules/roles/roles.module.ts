import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/db/entities/role.entity';
import { CommonModule } from 'src/common/common.module';
import { FunctionalityRole } from 'src/db/entities/functionality-role.entity';
import { FunctionalityRolePermit } from 'src/db/entities/functionality-role-permit.entity';
import { Functionality } from 'src/db/entities/functionality.entity';
import { Permit } from 'src/db/entities/permit.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Role, FunctionalityRole, FunctionalityRolePermit, Functionality, Permit]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
