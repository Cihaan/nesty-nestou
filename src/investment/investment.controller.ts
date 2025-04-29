import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Investment } from '../investments/investment.entity';
import { ProjectService } from '../project/project.service'; // Import ProjectService
import { User, UserRole } from '../users/user.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { InvestmentService } from './investment.service';

@UseGuards(JwtAuthGuard)
@Controller('investments')
export class InvestmentController {
  constructor(
    private readonly investmentService: InvestmentService,
    private readonly projectService: ProjectService, // Inject ProjectService
  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.INVESTOR)
  @Post()
  async create(
    @Body() createInvestmentDto: CreateInvestmentDto,
    @GetUser() user: User,
  ): Promise<Investment> {
    return this.investmentService.create(createInvestmentDto, user.id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.INVESTOR)
  @Get()
  async findByInvestor(@GetUser() user: User): Promise<Investment[]> {
    return this.investmentService.findByInvestorId(user.id);
  }

  @Get('project/:id')
  async findByProject(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Investment[]> {
    const project = await this.projectService.findById(id);

    // Check if user is project owner or admin
    if (project.ownerId !== user.id && user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'You do not have permission to view investments for this project',
      );
    }

    return this.investmentService.findByProjectId(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.INVESTOR)
  @Delete(':id')
  async delete(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.investmentService.delete(id, user);
  }
}
