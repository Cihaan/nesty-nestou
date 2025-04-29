import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Investment } from '../investments/investment.entity';
import { User } from '../users/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  budget: number;

  @Column()
  category: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, (user) => user.projects)
  owner: User;

  @Column({ default: true })
  isOpenForInvestment: boolean;

  @OneToMany(() => Investment, 'project')
  investments: Investment[];
}
