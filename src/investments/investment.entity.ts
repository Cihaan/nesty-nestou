import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { User } from '../users/user.entity';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  investorId: string;

  @ManyToOne(() => User, (user) => user.investments)
  investor: User;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.investments)
  project: Project;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  date: Date;
}
