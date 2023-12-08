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
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChipSelectComponent,
  IconCircleCheckComponent,
  InputComponent,
  TitleComponent,
} from '@ui/components';
import { FormChangeAreasService, ISimplifiedUserEditProfile } from '../../..';
import { AREAS, TYPE_AREA } from '../../../constants';

interface ISelectArea {
  id: number;
  name: AREAS;
  type?: TYPE_AREA;
}

interface ISelectAreaWithType extends ISelectArea {
  type: TYPE_AREA;
}

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
  selector: 'area-select',
  templateUrl: './area-select.component.html',
  styleUrls: ['./area-select.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AreaSelectComponent implements OnInit, OnChanges {
  @Input({ required: true }) dataUserEditProfile!:
    | ISimplifiedUserEditProfile
    | Partial<ISimplifiedUserEditProfile>;
  @Input({ required: true }) loadingProfile!: boolean;
  @Input({ required: true }) formGroup!: FormGroup;

  areasSelectTypeExpertise: ISelectAreaWithType[] = [];
  areasSelectTypeInteres: ISelectAreaWithType[] = [];

  TYPE_AREA = TYPE_AREA;

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

  protected formChangeAreasService = inject(FormChangeAreasService);

  ngOnInit(): void {
    this.formGroup = this.formChangeAreasService.getchangeAreasForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataUserEditProfile']) {
      const currentData = changes['dataUserEditProfile'].currentValue;
      this.formChangeAreasService.updateFormWithNewData(currentData);
      this.initializeSelectedAreas();
    }
  }

  initializeSelectedAreas() {
    if (!this.formGroup) return;
    const expertiseArray = this.formGroup.get('areaOfExpertise') as FormArray;
    const interestArray = this.formGroup.get('areaOfInteres') as FormArray;

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

    const expertiseControl = this.formGroup.get('areaOfExpertise') as FormArray;
    this.areasSelectTypeExpertise.forEach((area) => {
      expertiseControl.push(new FormControl(area.id));
    });

    const interestControl = this.formGroup.get('areaOfInteres') as FormArray;
    this.areasSelectTypeInteres.forEach((area) => {
      interestControl.push(new FormControl(area.id));
    });
  }

  toggleAreaSelection(area: ISelectArea, type: TYPE_AREA) {
    const control = this.formGroup.get(
      type === TYPE_AREA.EXPERTISE ? 'areaOfExpertise' : 'areaOfInteres'
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
