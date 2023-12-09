import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, TitleComponent } from '@ui/components';
import { ButtonChangeMainInfoComponent } from '../..';
import { MODALS } from '../../../../../common/constants';
import { ModalManagerService } from '../../../../../utils';
import { ModalChangeEmailComponent } from '../modal-change-email/modal-change-email.component';
import { ModalChangePasswordComponent } from '../modal-change-password/modal-change-password.component';
import { ModalChangeUserNameComponent } from '../modal-change-user-name/modal-change-user-name.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    TranslateModule,
    ButtonChangeMainInfoComponent,
    ModalChangePasswordComponent,
    ModalChangeUserNameComponent,
    ModalChangeEmailComponent,
  ],
  selector: 'buttons-actions-change-main-info',
  templateUrl: './buttons-actions-change-main-info.component.html',
  styleUrls: ['./buttons-actions-change-main-info.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ButtonsActionsChangeMainInfoComponent {
  /* @Input({ required: true }) dataUserEditProfile!:
    | ISimplifiedUserEditProfile
    | Partial<ISimplifiedUserEditProfile>; */
  @Input({ required: true }) userNameControl!: FormGroup;
  @Input({ required: true }) emailControl!: FormGroup;
  @Input({ required: true }) passwordControl!: FormGroup;
  @Input({ required: true }) originalUserName!: string;

  protected modalManagerService = inject(ModalManagerService);
  MODALS = MODALS;

  buttons = [
    {
      id: 1,
      title: 'Cambiar apodo',
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

  openModal(modalName: string): void {
    this.modalManagerService.openModal(modalName);
  }
}
