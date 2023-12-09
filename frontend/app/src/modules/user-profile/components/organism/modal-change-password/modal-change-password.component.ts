import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent, LabelComponent } from '@ui/components';
import { FormChangePassService } from '../../..';
import { LayoutModalComponent } from '../layout-modal/layout-modal.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModalComponent,
    LabelComponent,
    InputComponent,
  ],
  selector: 'modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ModalChangePasswordComponent {
  protected formChangePassService = inject(FormChangePassService);

  /* ngOnInit(): void {
    this.changePassword = this.formChangePassService.getChangePasswordForm();
  } */
}
