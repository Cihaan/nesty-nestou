import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User, UserRole } from '../users/user.entity';
import { SetUserInterestsDto } from './dto/set-user-interests.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@GetUser() user: User): Promise<User> {
    return this.userService.findById(user.id);
  }

  @Put('profile')
  async updateProfile(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(user.id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.userService.delete(id);
  }

  @Post('interests')
  async setUserInterests(
    @GetUser() user: User,
    @Body() setUserInterestsDto: SetUserInterestsDto,
  ): Promise<User> {
    return this.userService.setUserInterests(
      user.id,
      setUserInterestsDto.interests,
    );
  }

  @Get('interests')
  async getUserInterests(@GetUser() user: User): Promise<string[]> {
    return this.userService.getUserInterests(user.id);
  }
}
