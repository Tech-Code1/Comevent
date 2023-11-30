import { PartialType } from '@nestjs/swagger';
import { UserEditProfileDTO } from '.';

export class UserEditProfilePartialDTO extends PartialType(
  UserEditProfileDTO
) {}
