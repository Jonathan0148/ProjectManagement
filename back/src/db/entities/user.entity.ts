import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'roles_id', type: 'int' })
  roles_id: number;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'roles_id' })
  role: Role;

  @Column({ name: 'names', type: 'varchar', length: 100 })
  names: string;

  @Column({ name: 'surnames', type: 'varchar', length: 100 })
  surnames: string;

  @Column({ name: 'username', type: 'varchar', length: 50 })
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 200 })
  password: string;

  @Column({ name: 'email', type: 'varchar', length: 100, nullable: true })
  email?: string;

  @Column({ name: 'image', type: 'varchar', length: 150, nullable: true })
  image?: string;

  @Column({ name: 'active', type: 'tinyint' })
  active: boolean;

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
