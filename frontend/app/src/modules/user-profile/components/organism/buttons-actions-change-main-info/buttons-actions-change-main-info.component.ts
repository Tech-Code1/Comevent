import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, TitleComponent } from '@ui/components';
import { ButtonChangeMainInfoComponent } from '../..';
import { ISimplifiedUserEditProfile } from '../../..';
import { MODALS } from '../../../../../common/constants';
import { ModalManagerService } from '../../../../../utils';
import { ModalChangeEmailComponent } from '../modal-change-email/modal-change-email.component';
import { ModalChangeNickComponent } from '../modal-change-nick/modal-change-nick.component';
import { ModalChangePasswordComponent } from '../modal-change-password/modal-change-password.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    TranslateModule,
    ButtonChangeMainInfoComponent,
    ModalChangePasswordComponent,
    ModalChangeNickComponent,
    ModalChangeEmailComponent,
  ],
  selector: 'buttons-actions-change-main-info',
  templateUrl: './buttons-actions-change-main-info.component.html',
  styleUrls: ['./buttons-actions-change-main-info.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ButtonsActionsChangeMainInfoComponent {
  @Input({ required: true }) dataUserEditProfile!: ISimplifiedUserEditProfile;

  protected modalManagerService = inject(ModalManagerService);
  MODALS = MODALS;

  buttons = [
    {
      id: 1,
      title: 'Cambiar username',
      icon: 'profile',
      modal: MODALS.USER_NAME_MODAL,
    },
    {
      id: 2,
      title: 'Cambiar email',
      icon: 'mail',
      modal: MODALS.EMAIL_MODAL,
    },
    {
      id: 3,
      title: 'Cambiar contraseña',
      icon: 'key',
      modal: MODALS.PASSWORD_MODAL,
    },
  ];

  openModal(modalId: string): void {
    this.modalManagerService.openModal(modalId);
  }
}
