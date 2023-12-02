import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ButtonComponent,
  LabelComponent,
  TextAreaComponent,
  TitleComponent,
} from '@ui/components';
import { AvatarComponent, ButtonsActionsChangeMainInfoComponent } from '..';
import { ISimplifiedUserEditProfile } from '../../..';

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
  ],
  selector: 'main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MainInfoComponent {
  @Input({ required: true }) dataUserEditProfile!: ISimplifiedUserEditProfile;
  @Input({ required: true }) loadingProfile!: boolean;
}
