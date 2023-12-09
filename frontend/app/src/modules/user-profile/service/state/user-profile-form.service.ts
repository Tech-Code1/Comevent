import { Injectable, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserProfileStateService, UserProfileUpdateService } from '.';
import { SOCIAL_NETWORK } from '../../../../common/constants';
import { ValidatorsService } from '../../../../utils';
import { IEditProfileFormData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserProfileFormService {
  private formBuilder = inject(FormBuilder);
  private userProfileStateService = inject(UserProfileStateService);
  private validatorsService = inject(ValidatorsService);

  inputChanged = false;
  private editProfileForm!: FormGroup;
  private initialValues: Partial<IEditProfileFormData> = {};
  private originalValues!: any;
  private destroy$ = new Subject<void>();

  constructor() {
    this.initializeForm();
  }

  private initializeForm() {
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
        email: [''],
        pass: [''],
      }),
      avatar: new FormControl<File | null>(null),
    });

    this.originalValues = this.editProfileForm.value;
    this.changeInputs();
  }

  changeInputs(): void {
    this.registerChangeListeners(this.editProfileForm);
  }

  private registerChangeListeners(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);

      if (control) {
        // Verifica si el control no es null
        if (control instanceof FormGroup || control instanceof FormArray) {
          this.registerChangeListeners(control);
        } else {
          control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.inputChanged = true;
          });
        }
      }
    });
  }

  updateFormWithNewData() {
    if (!this.editProfileForm) {
      this.initializeForm();
    }

    const userProfileData = this.userProfileStateService.dataUserEditProfile();

    const socialNetworksData: { [key: string]: string } = {};
    const platforms = [
      SOCIAL_NETWORK.X,
      SOCIAL_NETWORK.DISCORD,
      SOCIAL_NETWORK.FACEBOOK,
      SOCIAL_NETWORK.GITHUB,
      SOCIAL_NETWORK.LINKEDIN,
      SOCIAL_NETWORK.INSTAGRAM,
    ];

    this.editProfileForm.patchValue({
      avatar: userProfileData.avatar || '',
      description: userProfileData.description || '',
      socialNetworks: {
        x: ['hola'],
        discord: [''],
        facebook: [''],
        github: [''],
        linkedin: [''],
        instagram: [''],
      },
      moreInformation: {
        firstName: userProfileData?.firstName || '',
        lastName: userProfileData?.lastName || '',
        gender: userProfileData?.gender || '',
        bornDate: userProfileData?.bornDate || '',
        specialty: userProfileData?.specialty || '',
        country: userProfileData?.country || '',
      },
      changePassword: {
        pass: [''],
        password: [''],
        passRepeat: [''],
      },
      changeUserName: {
        userName: [userProfileData?.username || ''],
      },
      changeEmail: {
        email: [userProfileData?.email || ''],
        pass: [''],
      },
    });

    if (userProfileData.areaOfExpertise) {
      this.updateFormArray(
        this.editProfileForm.get('areas.areaOfExpertise') as FormArray,
        userProfileData.areaOfExpertise
      );
    }
    if (userProfileData.areaOfInteres) {
      this.updateFormArray(
        this.editProfileForm.get('areas.areaOfInteres') as FormArray,
        userProfileData.areaOfInteres
      );
    }

    if (userProfileData.socialNetworks) {
      console.log('Datos de Redes Sociales:', userProfileData.socialNetworks);
      const socialNetworksFormGroup = this.editProfileForm.get(
        'socialNetworks'
      ) as FormGroup;

      userProfileData.socialNetworks.forEach((socialNetwork) => {
        const platform = socialNetwork.platform.toLowerCase();
        if (socialNetworksFormGroup.get(platform)) {
          socialNetworksFormGroup
            .get(platform)
            ?.setValue(socialNetwork.link || '');
        }
      });
    }

    this.originalValues = this.editProfileForm.value;
    this.inputChanged = false;
  }

  private updateFormArray(formArray: FormArray, data: string[]) {
    formArray.clear();
    if (data) {
      data.forEach((area) => {
        formArray.push(new FormControl(area));
      });
    }
  }

  get formEditProfile(): FormGroup {
    return this.editProfileForm;
  }

  updateProfile(userProfileUpdateService: UserProfileUpdateService) {
    const changedData = this.getChangedData(
      this.editProfileForm.value,
      this.initialValues
    );

    console.log(changedData, 'changeData');

    userProfileUpdateService.updateProfile(changedData);
  }

  private getChangedData(currentValues: any, initialValues: any): any {
    const changedData: any = {};

    Object.keys(currentValues).forEach((key) => {
      if (currentValues[key] instanceof FormGroup) {
        // Para FormGroup anidados, llama a getChangedData recursivamente
        const nestedChange = this.getChangedData(
          currentValues[key].value,
          initialValues[key] || {}
        );
        if (Object.keys(nestedChange).length > 0) {
          changedData[key] = nestedChange;
        }
      } else if (Array.isArray(currentValues[key])) {
        // Implementa lógica para arrays si es necesario
      } else {
        if (currentValues[key] !== initialValues[key]) {
          changedData[key] = currentValues[key];
        }
      }
    });

    return changedData;
  }

  // Métodos para obtener acceso a FormGroup anidados
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
