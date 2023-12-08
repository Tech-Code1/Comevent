import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { UserEditProfileDTO } from '.';

export class UserEditProfilePartialDTO extends PartialType(UserEditProfileDTO) {
  @ApiPropertyOptional({
    description: 'New password for the user',
    example: 'newPassword123',
    type: 'string',
  })
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    description: 'Current password of the user for verification',
    example: 'currentPassword123',
    type: 'string',
  })
  @IsString()
  currentPassword?: string;
}
