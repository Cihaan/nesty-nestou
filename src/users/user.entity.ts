import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../projects/project.entity';

export enum UserRole {
  ENTREPRENEUR = 'entrepreneur',
  INVESTOR = 'investor',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    default: UserRole.ENTREPRENEUR,
  })
  role: UserRole;

  @Column('text', { array: true, nullable: true })
  interests: string[];

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];
}
