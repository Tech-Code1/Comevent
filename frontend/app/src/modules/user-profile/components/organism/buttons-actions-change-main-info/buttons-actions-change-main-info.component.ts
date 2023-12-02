import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, TitleComponent } from '@ui/components';
import { ButtonChangeMainInfoComponent } from '../..';
import { ISimplifiedUserEditProfile } from '../../..';
import { SwitchService } from '../../../../../utils';
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
export class ButtonsActionsChangeMainInfoComponent implements OnInit {
  @Input({ required: true }) dataUserEditProfile!: ISimplifiedUserEditProfile;

  private modalService = inject(SwitchService);

  modalSwithNick: boolean = false;
  modalSwithEmail: boolean = false;
  modalSwithPass: boolean = false;

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

  ngOnInit(): void {
    this.modalService.$modal.subscribe((valor) => {
      (this.modalSwithNick = valor),
        (this.modalSwithEmail = valor),
        (this.modalSwithPass = valor);
    });
  }

  openModal(index: number): void {
    switch (index) {
      case 1:
        this.modalSwithNick = true;
        break;
      case 2:
        this.modalSwithEmail = true;
        break;
      case 3:
        this.modalSwithPass = true;
        break;
    }
  }
}
