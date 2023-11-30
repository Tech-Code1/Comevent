import { Country, Specialty } from '@db/entities';
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
import { IUserEditProfile } from '../types/userEditProfile.dto';

export class UserEditProfileDTO implements IUserEditProfile {
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
    example: 'Web Development, JavaScript',
    type: 'string',
  })
  @IsArray()
  @IsString({ each: true })
  userAreas!: string[];

  @ApiPropertyOptional({
    description: 'Social networks of the user',
    type: 'array',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  socialNetworks!: string[];

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
    type: 'string',
  })
  @IsString()
  gender!: string;

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
  @IsEnum(Specialty)
  specialty!: Specialty;

  @ApiProperty({
    description: 'Country of the user',
    type: 'Country',
  })
  @IsEnum(Country)
  country!: Country;
}
