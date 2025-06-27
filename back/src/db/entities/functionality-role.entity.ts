import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Functionality } from "./functionality.entity";
import { FunctionalityRolePermit } from "./functionality-role-permit.entity";

@Entity('modules_roles')
export class FunctionalityRole {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'roles_id', type: 'int' })
  roles_id: number;

  @ManyToOne(() => Role, (role) => role.functionalityRole)
  @JoinColumn({ name: 'roles_id' })
  role: Role;

  @Column({ name: 'modules_id', type: 'int' })
  modules_id: number;

  @ManyToOne(() => Functionality, (functionality) => functionality.functionalityRole)
  @JoinColumn({ name: 'modules_id' })
  functionality: Functionality;

  @Column({ name: 'status', type: 'tinyint' })
  status: boolean;

  @Column({ name: 'update_date', type: 'datetime', nullable: true })
  updateDate?: Date;

  @Column({ name: 'update_user_id', type: 'int', nullable: true })
  updateUserId?: number;

  @Column({ name: 'insert_date', type: 'datetime' })
  insertDate: Date;

  @Column({ name: 'insert_user_id', type: 'int' })
  insertUserId: number;

  @OneToMany(() => FunctionalityRolePermit, (functionalityRolePermit) => functionalityRolePermit.functionalityRole)
  functionalityRolePermit: FunctionalityRolePermit[];
}
