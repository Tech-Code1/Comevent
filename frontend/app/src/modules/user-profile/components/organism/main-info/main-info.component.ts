import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  ButtonComponent,
  LabelComponent,
  TextAreaComponent,
  TitleComponent,
} from '@ui/components';
import { AvatarComponent, ButtonsActionsChangeMainInfoComponent } from '..';
import { ISimplifiedUserEditProfile } from '../../..';

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

export interface IFormPartialPersonalInformation {
  avatar: FormControl<string | null>;
  description: FormControl<string>;
  changeUserName: FormGroup<IUserName>;
  changeEmail: FormGroup<IEmail>;
  changePassword: FormGroup<IPassword>;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    TranslateModule,
    AvatarComponent,
    TextAreaComponent,
    LabelComponent,
    ButtonsActionsChangeMainInfoComponent,
    ReactiveFormsModule,
  ],
  selector: 'main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class MainInfoComponent implements OnInit, OnChanges {
  @Input({ required: true }) dataUserEditProfile!:
    | ISimplifiedUserEditProfile
    | Partial<ISimplifiedUserEditProfile>;
  @Input({ required: true }) loadingProfile!: boolean;
  @Input({ required: true }) controlKey = '';
  private parentContainer = inject(ControlContainer);
  private formBuilder = inject(NonNullableFormBuilder);
  currentAvatarUrl!: string | undefined;
  currentUserName: string | undefined = '';
  currentEmail: string | undefined = '';

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      this.formBuilder.group<IFormPartialPersonalInformation>({
        description: this.formBuilder.control(''),
        avatar: this.formBuilder.control(null),
        changeEmail: this.formBuilder.group({
          email: this.formBuilder.control(''),
          pass: this.formBuilder.control(''),
        }),
        changeUserName: this.formBuilder.group({
          userName: this.formBuilder.control(''),
          pass: this.formBuilder.control(''),
        }),
        changePassword: this.formBuilder.group({
          pass: this.formBuilder.control(''),
          password: this.formBuilder.control(''),
          passRepeat: this.formBuilder.control(''),
        }),
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataUserEditProfile'] && this.dataUserEditProfile) {
      this.updateFormWithUserProfileData();
    }
  }

  private updateFormWithUserProfileData(): void {
    if (this.dataUserEditProfile) {
      this.parentFormGroup.patchValue({
        [this.controlKey]: {
          description: this.dataUserEditProfile.description,
          changeEmail: {
            email: this.dataUserEditProfile.email,
          },
          changeUserName: {
            userName: this.dataUserEditProfile.username,
          },
        },
      });

      this.currentAvatarUrl = this.dataUserEditProfile.avatar;
      this.currentUserName = this.dataUserEditProfile.username;
      this.currentEmail = this.dataUserEditProfile.email;
    }
  }

  get avatarControl(): FormControl {
    const control = this.parentFormGroup.get(this.controlKey)?.get('avatar');
    return control as FormControl;
  }

  get userNameControl(): FormGroup {
    const control = this.parentFormGroup.get(
      `${this.controlKey}.changeUserName`
    );
    return control as FormGroup;
  }

  get emailControl(): FormGroup {
    const control = this.parentFormGroup.get(`${this.controlKey}.changeEmail`);
    return control as FormGroup;
  }

  get passwordControl(): FormGroup {
    const control = this.parentFormGroup.get(
      `${this.controlKey}.changePassword`
    );
    return control as FormGroup;
  }
}
