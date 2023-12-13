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
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  InputComponent,
  LabelComponent,
  SelectComponent,
  TitleComponent,
} from '@ui/components';
import {
  ICountries,
  IFormMoreInfo,
  ISimplifiedUserEditProfile,
  ISpecialties,
} from '../../..';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    TranslateModule,
    InputComponent,
    ReactiveFormsModule,
    LabelComponent,
    SelectComponent,
  ],
  selector: 'more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class MoreInformationComponent implements OnInit, OnChanges {
  @Input({ required: true }) dataUserEditProfile!:
    | ISimplifiedUserEditProfile
    | Partial<ISimplifiedUserEditProfile>;
  @Input({ required: true }) loadingProfile!: boolean;
  @Input({ required: true }) countries!: ICountries[];
  @Input({ required: true }) specialties!: ISpecialties[];
  @Input({ required: true }) controlKey = '';

  genders: string[] = ['hombre', 'mujer'];
  countriesOptions: ICountries[] = [];
  specialtiesOptions: ISpecialties[] = [];
  private formBuilder = inject(NonNullableFormBuilder);
  private parentContainer = inject(ControlContainer);

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      this.formBuilder.group<IFormMoreInfo>({
        firstName: this.formBuilder.control(null),
        lastName: this.formBuilder.control(null),
        gender: this.formBuilder.control(null),
        bornDate: this.formBuilder.control(null),
        specialty: this.formBuilder.control(null),
        country: this.formBuilder.control(null),
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataUserEditProfile'] && this.dataUserEditProfile) {
      this.updateFormWithUserProfileData();
    }

    if (changes['specialties']) {
      this.specialtiesOptions = this.specialties.map((specialty) => ({
        id: specialty.id,
        name: specialty.name,
      }));
    }

    if (changes['countries']) {
      this.countriesOptions = this.countries.map((country) => ({
        id: country.id,
        name: country.name,
      }));
    }
  }

  updateFormWithUserProfileData(): void {
    if (this.dataUserEditProfile) {
      this.parentFormGroup.patchValue({
        [this.controlKey]: {
          firstName: this.dataUserEditProfile.firstName || '',
          lastName: this.dataUserEditProfile.lastName || '',
          gender: this.dataUserEditProfile.gender,
          bornDate: this.dataUserEditProfile.bornDate,
          specialty: this.dataUserEditProfile.specialty?.id || null,
          country: this.dataUserEditProfile.country?.id || null,
        },
      });
    }
  }
}
