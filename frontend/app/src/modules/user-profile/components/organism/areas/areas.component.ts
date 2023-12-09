import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent, TitleComponent } from '@ui/components';
import { TYPE_AREA } from '../../../constants/areas';
import { AreaSelectComponent } from '../area-select/area-select.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    TranslateModule,
    InputComponent,
    ReactiveFormsModule,
    AreaSelectComponent,
  ],
  selector: 'areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AreasComponent {
  /* @Input({ required: true }) dataUserEditProfile!:
    | ISimplifiedUserEditProfile
    | Partial<ISimplifiedUserEditProfile>; */
  @Input({ required: true }) loadingProfile!: boolean;
  @Input({ required: true }) formGroup!: FormGroup;

  TYPE_AREA = TYPE_AREA;
}
