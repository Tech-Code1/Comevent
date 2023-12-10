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
  AbstractControl,
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChipSelectComponent,
  IconCircleCheckComponent,
  InputComponent,
  TitleComponent,
} from '@ui/components';
import { AREAS, TYPE_AREA } from '../../../constants/areas';
import {
  IFormAreas,
  ISelectArea,
  ISelectAreaWithType,
  ISimplifiedUserEditProfile,
} from '../../../types';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    TranslateModule,
    InputComponent,
    ReactiveFormsModule,
    ChipSelectComponent,
    IconCircleCheckComponent,
  ],
  selector: 'areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class AreasComponent implements OnInit, OnChanges {
  @Input({ required: true }) dataUserEditProfile!:
    | ISimplifiedUserEditProfile
    | Partial<ISimplifiedUserEditProfile>;
  @Input({ required: true }) loadingProfile!: boolean;
  @Input({ required: true }) controlKey = '';
  private formBuilder = inject(NonNullableFormBuilder);
  private parentContainer = inject(ControlContainer);
  areasSelectTypeExpertise: ISelectAreaWithType[] = [];
  areasSelectTypeInteres: ISelectAreaWithType[] = [];

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      this.formBuilder.group<IFormAreas>({
        areaOfExpertise: this.formBuilder.array([]),
        areaOfInteres: this.formBuilder.array([]),
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataUserEditProfile'] && this.dataUserEditProfile) {
      this.updateFormWithUserProfileData();
      this.initializeSelectedAreas();
    }
  }

  updateFormWithUserProfileData() {
    if (!this.parentFormGroup || !this.controlKey) return;
    // Actualizar el FormArray para areaOfExpertise
    const areaOfExpertiseArray = this.getFormControl(
      'areaOfExpertise'
    ) as FormArray;
    if (areaOfExpertiseArray) {
      areaOfExpertiseArray.clear(); // Limpia el FormArray existente
    }
    this.dataUserEditProfile.areaOfExpertise?.forEach((area) => {
      areaOfExpertiseArray.push(new FormControl(area));
    });

    // Actualizar el FormArray para areaOfInteres
    const areaOfInteresArray = this.getFormControl(
      'areaOfInteres'
    ) as FormArray;
    if (areaOfInteresArray) {
      areaOfInteresArray.clear(); // Limpia el FormArray existente
    }
    this.dataUserEditProfile.areaOfInteres?.forEach((area) => {
      areaOfInteresArray.push(new FormControl(area));
    });
  }

  areas: ISelectArea[] = [
    {
      id: 1,
      name: AREAS.DEVELOPMENT,
    },
    {
      id: 2,
      name: AREAS.DESIGN,
    },
    {
      id: 3,
      name: AREAS.MARKETING,
    },
    {
      id: 4,
      name: AREAS.SALES,
    },
    {
      id: 5,
      name: AREAS.HUMAN_RESOURCES,
    },
    {
      id: 6,
      name: AREAS.FINANCE,
    },
    {
      id: 7,
      name: AREAS.CUSTOMER_SERVICE,
    },
    {
      id: 8,
      name: AREAS.RESEARCH_AND_DEVELOPMENT,
    },
    {
      id: 9,
      name: AREAS.IT_SUPPORT,
    },
    {
      id: 10,
      name: AREAS.LEGAL,
    },
    {
      id: 11,
      name: AREAS.PUBLIC_RELATIONS,
    },
    {
      id: 12,
      name: AREAS.OPERATIONS,
    },
  ];

  TYPE_AREA = TYPE_AREA;

  getSelectedAreasData(): {
    areaOfExpertise: number[];
    areaOfInterest: number[];
  } {
    const areaOfExpertiseIds = this.areasSelectTypeExpertise
      .filter((area) => area.type === TYPE_AREA.EXPERTISE)
      .map((area) => area.id);

    const areaOfInterestIds = this.areasSelectTypeInteres
      .filter((area) => area.type === TYPE_AREA.INTEREST)
      .map((area) => area.id);

    return {
      areaOfExpertise: areaOfExpertiseIds,
      areaOfInterest: areaOfInterestIds,
    };
  }

  getFormControl(controlName: string): AbstractControl | null {
    return this.parentFormGroup.get(`${this.controlKey}.${controlName}`);
  }

  initializeSelectedAreas() {
    if (!this.parentFormGroup || !this.controlKey) return;

    const expertiseArray = this.getFormControl('areaOfExpertise') as FormArray;
    const interestArray = this.getFormControl('areaOfInteres') as FormArray;

    if (
      expertiseArray instanceof FormArray &&
      interestArray instanceof FormArray
    ) {
      this.areasSelectTypeExpertise = expertiseArray.value
        .map((areaName: string) => {
          const foundArea = this.areas.find(
            (area: ISelectArea) => area.name === areaName
          );
          console.log(`Mapping ${areaName}:`, foundArea);
          return foundArea;
        })
        .filter((area: ISelectArea | undefined): area is ISelectArea => !!area)
        .map((area: ISelectArea) => ({
          id: area.id,
          name: area.name,
          type: TYPE_AREA.EXPERTISE,
        }));

      this.areasSelectTypeInteres = interestArray.value
        .map((areaName: string) =>
          this.areas.find((area: ISelectArea) => area.name === areaName)
        )
        .filter((area: ISelectArea | undefined): area is ISelectArea => !!area)
        .map((area: ISelectArea) => ({
          id: area.id,
          name: area.name,
          type: TYPE_AREA.INTEREST,
        }));

      const expertiseControl = this.getFormControl('areaOfExpertise');
      if (expertiseControl instanceof FormArray) {
        this.areasSelectTypeExpertise.forEach((area) => {
          expertiseControl.push(new FormControl(area.id));
        });
      }

      const interestControl = this.getFormControl('areaOfInteres');
      if (interestControl instanceof FormArray) {
        this.areasSelectTypeInteres.forEach((area) => {
          interestControl.push(new FormControl(area.id));
        });
      }
    }
  }

  toggleAreaSelection(area: ISelectArea, type: TYPE_AREA) {
    const control = this.parentFormGroup.get(
      type === TYPE_AREA.EXPERTISE
        ? `${this.controlKey}.areaOfExpertise`
        : `${this.controlKey}.areaOfInteres`
    ) as FormArray;

    const index = control.value.findIndex(
      (selectedAreaId: number) => selectedAreaId === area.id
    );

    if (index > -1) {
      control.removeAt(index);
      this.removeFromSelectedAreas(area.id, type);
    } else {
      control.push(new FormControl(area.id));
      this.addToSelectedAreas(area, type);
    }
  }

  addToSelectedAreas(area: ISelectArea, type: TYPE_AREA) {
    const selectedArray =
      type === TYPE_AREA.EXPERTISE
        ? this.areasSelectTypeExpertise
        : this.areasSelectTypeInteres;
    selectedArray.push({ ...area, type });
  }

  removeFromSelectedAreas(areaId: number, type: TYPE_AREA) {
    const selectedArray =
      type === TYPE_AREA.EXPERTISE
        ? this.areasSelectTypeExpertise
        : this.areasSelectTypeInteres;
    const index = selectedArray.findIndex(
      (selectedArea) => selectedArea.id === areaId
    );
    if (index > -1) {
      selectedArray.splice(index, 1);
    }
  }

  isAreaSelected(area: ISelectArea, type: TYPE_AREA): boolean {
    if (type === TYPE_AREA.EXPERTISE) {
      return this.areasSelectTypeExpertise.some(
        (selectedArea) => selectedArea.id === area.id
      );
    } else {
      return this.areasSelectTypeInteres.some(
        (selectedArea) => selectedArea.id === area.id
      );
    }
  }
}
