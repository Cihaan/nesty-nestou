import { IsArray, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../users/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  role?: UserRole;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];
}
