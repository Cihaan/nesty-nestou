import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module'; // Import UserModule
import { InterestsController } from './interests.controller';
import { InterestsService } from './interests.service';

@Module({
  imports: [UserModule], // Import UserModule
  controllers: [InterestsController],
  providers: [InterestsService],
})
export class InterestsModule {}
