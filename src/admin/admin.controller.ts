import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { InvestmentService } from '../investment/investment.service';
import { Investment } from '../investments/investment.entity';
import { UserService } from '../user/user.service';
import { User, UserRole } from '../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly investmentService: InvestmentService,
  ) {}

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }

  @Get('investments')
  async getAllInvestments(): Promise<Investment[]> {
    // In a real application, you might want to paginate this
    return this.investmentService.findAll(); // Use the public method
  }
}
