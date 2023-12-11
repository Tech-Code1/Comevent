import { Gender } from '@db/constants';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ISocialNetworks } from '../types';

export class UserEditProfilePartialDTO {
  @ApiPropertyOptional({
    description: 'New password for the user',
    example: 'newPassword123',
    type: 'string',
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    description: 'Current password of the user for verification',
    example: 'currentPassword123',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  currentPassword?: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'johndoe',
    type: 'string',
  })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    description: 'Avatar URL of the user',
    example: 'https://example.com/avatar.jpg',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'johndoe@example.com',
    type: 'string',
  })
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Description of the user',
    example: 'Experienced web developer...',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Areas of expertise of the user',
    example: [5, 8, 1],
    type: 'number[]',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  areaOfExpertise?: number[];

  @ApiProperty({
    description: 'Areas of interest of the user',
    example: [1, 3, 5],
    type: 'number[]',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  areaOfInteres?: number[];

  @ApiPropertyOptional({
    description: 'Social networks of the user',
    type: 'array',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  socialNetworks?: ISocialNetworks[];

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Gender of the user',
    enum: Gender,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiPropertyOptional({
    description: 'Birth date of the user',
    type: 'Date',
  })
  @IsDate()
  @IsOptional()
  bornDate?: Date;

  @ApiProperty({
    description: 'Age of the user',
    example: 30,
    type: 'number',
  })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiPropertyOptional({
    description: 'Specialty of the user',
    type: 'Specialty',
  })
  @IsNumber()
  @IsOptional()
  specialty?: number;

  @ApiProperty({
    description: 'Country of the user',
    type: 'Country',
  })
  @IsNumber()
  @IsOptional()
  country?: number;
}
