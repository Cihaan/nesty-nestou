import { IsArray, IsString } from 'class-validator';

export class SetUserInterestsDto {
  @IsArray()
  @IsString({ each: true })
  interests: string[];
}
