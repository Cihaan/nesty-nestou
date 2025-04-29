import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from '../investments/investment.entity';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { User, UserRole } from '../users/user.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private investmentsRepository: Repository<Investment>,
    private userService: UserService,
    private projectService: ProjectService,
  ) {}

  async create(
    createInvestmentDto: CreateInvestmentDto,
    investorId: string,
  ): Promise<Investment> {
    const { projectId, amount } = createInvestmentDto;

    const investor = await this.userService.findById(investorId);
    if (investor.role !== UserRole.INVESTOR) {
      throw new UnauthorizedException('Only investors can invest in projects');
    }

    const project = await this.projectService.findById(projectId);
    if (!project.isOpenForInvestment) {
      // Check if project is open
      throw new BadRequestException('This project is not open for investment');
    }

    const investment = this.investmentsRepository.create({
      projectId,
      investorId,
      amount,
    });

    return this.investmentsRepository.save(investment);
  }

  async findByInvestorId(investorId: string): Promise<Investment[]> {
    return this.investmentsRepository.find({ where: { investorId } });
  }

  async findByProjectId(projectId: string): Promise<Investment[]> {
    return this.investmentsRepository.find({ where: { projectId } });
  }

  async delete(id: string, user: User): Promise<void> {
    const investment = await this.investmentsRepository.findOne({
      where: { id },
    });

    if (!investment) {
      throw new NotFoundException(`Investment with ID "${id}" not found`);
    }

    if (investment.investorId !== user.id) {
      throw new UnauthorizedException(
        'You can only cancel your own investments',
      );
    }

    await this.investmentsRepository.delete(id);
  }

  async findAll(): Promise<Investment[]> {
    return this.investmentsRepository.find();
  }
}
