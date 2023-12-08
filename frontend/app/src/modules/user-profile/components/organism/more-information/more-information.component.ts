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
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  InputComponent,
  LabelComponent,
  SelectComponent,
  TitleComponent,
} from '@ui/components';
import {
  FormChangeMoreInformationsService,
  ICountries,
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
})
export class MoreInformationComponent implements OnChanges, OnInit {
  @Input({ required: true }) dataUserEditProfile!:
    | ISimplifiedUserEditProfile
    | Partial<ISimplifiedUserEditProfile>;
  @Input({ required: true }) loadingProfile!: boolean;
  @Input({ required: true }) countries!: ICountries[];
  @Input({ required: true }) specialties!: ISpecialties[];
  @Input({ required: true }) formGroup!: FormGroup;

  genders: string[] = ['hombre', 'mujer'];
  countriesOptions: string[] = [];
  specialtiesOptions: string[] = [];

  protected formchangeMoreInformationService = inject(
    FormChangeMoreInformationsService
  );

  ngOnInit(): void {
    this.formGroup =
      this.formchangeMoreInformationService.getchangeMoreInformationForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataUserEditProfile']) {
      const currentData = changes['dataUserEditProfile'].currentValue;
      this.formchangeMoreInformationService.updateFormWithNewData(currentData);
    }

    if (changes['specialties']) {
      this.specialtiesOptions = this.specialties.map(
        (specialty) => specialty.name
      );
    }

    if (changes['countries']) {
      this.countriesOptions = this.countries.map((country) => country.name);
    }
  }
}
