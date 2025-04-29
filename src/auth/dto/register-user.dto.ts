import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../users/user.entity';

export class RegisterUserDto {
  @ApiProperty({ example: 'test@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'User role',
    required: false,
    enum: UserRole,
  })
  @IsOptional()
  @IsString()
  role?: UserRole;

  @ApiProperty({
    example: ['technology', 'finance'],
    description: 'User interests',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];
}
