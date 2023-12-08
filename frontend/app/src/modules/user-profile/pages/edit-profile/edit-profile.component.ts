import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
  private formBuilder = inject(FormBuilder);
  public userProfileStateService = inject(UserProfileStateService);
  public validatorsService = inject(ValidatorsService);
  private userProfileUpdateService = inject(UserProfileUpdateService);
  editProfileForm!: FormGroup;
  initialValues!: any;

  ngOnInit(): void {
    const userId = this.tokenService.getUserIdFromToken();

    if (userId) {
      this.userProfileStateService.onDataUserEditProfile(userId);
    }

    this.userProfileStateService.onDataCountries();
    this.userProfileStateService.onDataSpecialties();

    this.editProfileForm = this.formBuilder.group({
      description: [''],
      socialNetworks: this.formBuilder.group({
        x: [''],
        discord: [''],
        facebook: [''],
        github: [''],
        linkedin: [''],
        instagram: [''],
      }),
      areas: this.formBuilder.group({
        areaOfExpertise: this.formBuilder.array([]),
        areaOfInteres: this.formBuilder.array([]),
      }),
      moreInformation: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        gender: [''],
        bornDate: [''],
        specialty: [''],
        country: [''],
      }),
      changeUserName: this.formBuilder.group({
        userName: [''], // Valor inicial obtenido del servicio
        pass: [''],
      }),
      changePassword: this.formBuilder.group(
        {
          pass: [''],
          password: [''],
          passRepeat: [''],
        },
        {
          validators: this.validatorsService.similarInputs(
            'password',
            'passRepeat'
          ),
        }
      ),
      changeEmail: this.formBuilder.group({
        email: [''], // Valor inicial obtenido del servicio
        pass: [''],
      }),
      avatar: new FormControl<File | null>(null),
      // ...otros campos...
    });

    this.initialValues = this.editProfileForm.value;
  }

  onSaveChanges() {
    const changedData = this.getChangedData(
      this.editProfileForm.value,
      this.initialValues
    );
    this.userProfileUpdateService.updateProfile(changedData);
  }

  private getChangedData(currentValues: any, initialValues: any): any {
    const changedData: any = {};
    Object.keys(currentValues).forEach((key) => {
      if (currentValues[key] !== initialValues[key]) {
        changedData[key] = currentValues[key];
      }
    });
    return changedData;
  }

  get descriptionFormGroup(): FormGroup {
    return this.editProfileForm.get('description') as FormGroup;
  }

  get socialNetworksFormGroup(): FormGroup {
    return this.editProfileForm.get('socialNetworks') as FormGroup;
  }

  get areasFormArray(): FormGroup {
    return this.editProfileForm.get('areas') as FormGroup;
  }

  get moreInformationFormGroup(): FormGroup {
    return this.editProfileForm.get('moreInformation') as FormGroup;
  }

  get changeUserNameFormGroup(): FormGroup {
    return this.editProfileForm.get('changeUserName') as FormGroup;
  }

  get changeEmailFormGroup(): FormGroup {
    return this.editProfileForm.get('changeEmail') as FormGroup;
  }

  get changePasswordFormGroup(): FormGroup {
    return this.editProfileForm.get('changePassword') as FormGroup;
  }

  get avatarFormControl(): FormControl {
    return this.editProfileForm.get('avatar') as FormControl;
  }
}
