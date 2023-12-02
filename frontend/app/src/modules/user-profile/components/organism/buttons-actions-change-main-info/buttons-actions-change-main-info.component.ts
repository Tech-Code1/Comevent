import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, TitleComponent } from '@ui/components';
import { ButtonChangeMainInfoComponent } from '../..';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    TranslateModule,
    ButtonChangeMainInfoComponent,
  ],
  selector: 'buttons-actions-change-main-info',
  templateUrl: './buttons-actions-change-main-info.component.html',
  styleUrls: ['./buttons-actions-change-main-info.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ButtonsActionsChangeMainInfoComponent {
  buttons = [
    {
      id: 1,
      title: 'Cambiar username',
      icon: 'profile',
    },
    {
      id: 2,
      title: 'Cambiar email',
      icon: 'mail',
    },
    {
      id: 3,
      title: 'Cambiar contraseña',
      icon: 'key',
    },
  ];
}
