import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from '../investments/investment.entity';
import { ProjectModule } from '../project/project.module'; // Import ProjectModule
import { UserModule } from '../user/user.module'; // Import UserModule
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), UserModule, ProjectModule], // Import UserModule and ProjectModule
  controllers: [InvestmentController],
  providers: [InvestmentService],
  exports: [InvestmentService],
})
export class InvestmentModule {}
