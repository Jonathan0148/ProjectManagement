import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FunctionalityRolePermit } from "./functionality-role-permit.entity";
import { Task } from "./task.entity";

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

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

  @OneToMany(() => Task, (task) => task.project)
  task: Task[];
}
