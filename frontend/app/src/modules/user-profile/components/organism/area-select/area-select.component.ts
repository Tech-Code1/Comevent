import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChipSelectComponent,
  IconCircleCheckComponent,
  InputComponent,
  TitleComponent,
} from '@ui/components';
import { ISimplifiedUserEditProfile } from '../../..';
import { AREAS, TYPE_AREA } from '../../../constants';

interface ISelectArea {
  id: number;
  name: string;
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
export class AreaSelectComponent {
  @Input({ required: true }) dataUserEditProfile!: ISimplifiedUserEditProfile;
  @Input({ required: true }) loadingProfile!: boolean;

  areasSelectTypeExpertise: ISelectAreaWithType[] = [];
  areasSelectTypeInteres: ISelectAreaWithType[] = [];

  TYPE_AREA = TYPE_AREA;

  areas = [
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
      type: TYPE_AREA,
    },
    {
      id: 12,
      name: AREAS.OPERATIONS,
    },
  ];

  toggleAreaSelection(area: ISelectArea, type: TYPE_AREA) {
    const selectionArray =
      type === TYPE_AREA.EXPERTISE
        ? this.areasSelectTypeExpertise
        : this.areasSelectTypeInteres;
    const index = selectionArray.findIndex(
      (selectedArea) => selectedArea.id === area.id
    );

    if (index > -1) {
      // Si el área ya está seleccionada, deselecciónala
      selectionArray.splice(index, 1);
    } else {
      // Si el área no está seleccionada, selecciónala
      selectionArray.push({ ...area, type });
    }
  }

  isAreaSelected(area: ISelectArea, type: TYPE_AREA): boolean {
    const selectionArray =
      type === TYPE_AREA.EXPERTISE
        ? this.areasSelectTypeExpertise
        : this.areasSelectTypeInteres;
    return selectionArray.some((selectedArea) => selectedArea.id === area.id);
  }
}
