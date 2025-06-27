import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 30 })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'active', type: 'tinyint' })
  active: boolean;

  @Column({ name: 'status', type: 'tinyint' })
  status: boolean;

  @Column({ name: 'update_date', type: 'datetime', nullable: true })
  updateDate?: Date;

  @Column({ name: 'update_user_id', type: 'int', nullable: true })
  updateDateId?: number;

  @Column({ name: 'insert_date', type: 'datetime' })
  insertDate: Date;

  @Column({ name: 'insert_user_id', type: 'int' })
  insertUserId: number;

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
