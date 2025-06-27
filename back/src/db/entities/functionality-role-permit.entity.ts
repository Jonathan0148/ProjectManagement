import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FunctionalityRole } from "./functionality-role.entity";
import { Permit } from "./permit.entity";

@Entity('modules_roles_permits')
export class FunctionalityRolePermit {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'modules_roles_id', type: 'int' })
  modules_roles_id: number;

  @ManyToOne(() => FunctionalityRole, (functionalityRole) => functionalityRole.functionalityRolePermit)
  @JoinColumn({ name: 'modules_roles_id' })
  functionalityRole: FunctionalityRole;

  @Column({ name: 'permits_id', type: 'int' })
  permits_id: number;

  @ManyToOne(() => Permit, (permit) => permit.functionalityRolePermit)
  @JoinColumn({ name: 'permits_id' })
  permit: Permit;

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
}
