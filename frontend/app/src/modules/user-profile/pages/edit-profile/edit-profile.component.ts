import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  IconCircleArrowLeftComponent,
  TitleComponent,
} from '@ui/components';
import {
  AreasComponent,
  MainInfoComponent,
  MoreInformationComponent,
  SocialNetworksComponent,
  UserProfileFormService,
  UserProfileStateService,
  UserProfileUpdateService,
} from '../..';
import { TokenService } from '../../../../common/services/token.service';
import { ValidatorsService } from '../../../../utils';

export interface IUserName {
  userName: FormControl<string>;
  pass: FormControl<string>;
}

export interface IEmail {
  email: FormControl<string>;
  pass: FormControl<string>;
}

export interface IPassword {
  pass: FormControl<string>;
  password: FormControl<string>;
  passRepeat: FormControl<string>;
}

export interface IFormPersonalInformation {
  avatar: FormControl<string>;
  description: FormControl<string>;
  changeUserName: FormControl<IUserName>;
  changeEmail: FormControl<IEmail>;
  changePassword: FormControl<IPassword>;
}

export type IUserUpdateForm = IFormPersonalInformation;

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    TitleComponent,
    IconCircleArrowLeftComponent,
    MainInfoComponent,
    RouterModule,
    SocialNetworksComponent,
    AreasComponent,
    MoreInformationComponent,
  ],
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  private tokenService = inject(TokenService);
  private formBuilder = inject(NonNullableFormBuilder);
  public userProfileStateService = inject(UserProfileStateService);
  public userProfileFormService = inject(UserProfileFormService);
  public validatorsService = inject(ValidatorsService);
  private userProfileUpdateService = inject(UserProfileUpdateService);
  editProfileForm!: FormGroup;

  ngOnInit(): void {
    const userId = this.tokenService.getUserIdFromToken();

    if (userId) {
      this.userProfileStateService.onDataUserEditProfile(userId);
    }

    this.userProfileStateService.onDataCountries();
    this.userProfileStateService.onDataSpecialties();

    this.editProfileForm = new FormGroup({});
  }

  getFormControlValueAsType = <T>(
    formGroup: FormGroup,
    controlName: string
  ): T | null => {
    const control = formGroup.get(controlName);
    if (control) {
      return control.value as T;
    }
    return null;
  };

  saveData() {
    // console.log(this.formGroup.getRawValue());

    // const data= this.formGroup.get('dataFather')?.value as unknown as IPersonData;
    const data = this.getFormControlValueAsType<IUserUpdateForm>(
      this.editProfileForm,
      'mainInfo'
    );
    console.log('data:', data);
  }
}
