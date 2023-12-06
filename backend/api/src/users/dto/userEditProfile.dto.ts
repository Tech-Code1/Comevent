import { Gender } from '@db/constants';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  ISimplifiedUserEditProfile,
  ISocialNetworks,
} from '../types/userEditProfile.dto';

export class UserEditProfileDTO implements ISimplifiedUserEditProfile {
  @ApiProperty({
    description: 'Username of the user',
    example: 'johndoe',
    type: 'string',
  })
  @IsString()
  @MaxLength(50)
  username!: string;

  @ApiPropertyOptional({
    description: 'Avatar URL of the user',
    example: 'https://example.com/avatar.jpg',
    type: 'string',
  })
  @IsString()
  avatar!: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'johndoe@example.com',
    type: 'string',
  })
  @IsEmail()
  @IsString()
  email!: string;

  @ApiPropertyOptional({
    description: 'Description of the user',
    example: 'Experienced web developer...',
    type: 'string',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    description: 'Areas of expertise of the user',
    example: ['Web Development', 'JavaScript'],
    type: 'string',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  areaOfExpertise!: string[];

  @ApiProperty({
    description: 'Areas of interest of the user',
    example: ['Artificial Intelligence', 'Machine Learning'],
    type: 'string',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  areaOfInteres!: string[];

  @ApiPropertyOptional({
    description: 'Social networks of the user',
    type: 'array',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  socialNetworks!: ISocialNetworks[];

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    type: 'string',
  })
  @IsString()
  firstName!: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    type: 'string',
  })
  @IsString()
  lastName!: string;

  @ApiPropertyOptional({
    description: 'Gender of the user',
    enum: Gender,
  })
  @IsEnum(Gender)
  gender!: Gender;

  @ApiPropertyOptional({
    description: 'Birth date of the user',
    type: 'Date',
  })
  @IsDate()
  bornDate!: Date;

  @ApiProperty({
    description: 'Age of the user',
    example: 30,
    type: 'number',
  })
  @IsNumber()
  age!: number;

  @ApiPropertyOptional({
    description: 'Specialty of the user',
    type: 'Specialty',
  })
  @IsString()
  specialty!: string;

  @ApiProperty({
    description: 'Country of the user',
    type: 'Country',
  })
  @IsString()
  country!: string;
}
