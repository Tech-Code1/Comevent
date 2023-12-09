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

export interface IFormPartialPersonalInformation {
  avatar: FormControl<string | null>;
  description: FormControl<string>;
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
}
