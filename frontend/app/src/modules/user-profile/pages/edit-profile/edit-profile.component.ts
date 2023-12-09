import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
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
  IUserUpdateForm,
  MainInfoComponent,
  MoreInformationComponent,
  SocialNetworksComponent,
  UserProfileFormService,
  UserProfileStateService,
  UserProfileUpdateService,
} from '../..';
import { TokenService } from '../../../../common/services/token.service';
import { ValidatorsService } from '../../../../utils';
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

    const dataNetwork = this.getFormControlValueAsType<IUserUpdateForm>(
      this.editProfileForm,
      'socialNetworkInfo'
    );
    const dataAreas = this.getFormControlValueAsType<IUserUpdateForm>(
      this.editProfileForm,
      'areasInfo'
    );

    console.log('data:', data);
    console.log('dataNetwork:', dataNetwork);
    console.log('dataAreas:', dataAreas);
  }
}
