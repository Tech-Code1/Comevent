import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent, LabelComponent } from '@ui/components';
import { FormChangeEmailService } from '../../../service/state';
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
  selector: 'modal-change-email',
  templateUrl: './modal-change-email.component.html',
  styleUrls: ['./modal-change-email.component.scss'],
})
export class ModalChangeEmailComponent {
  protected formChangeEmailService = inject(FormChangeEmailService);

  /* ngOnInit(): void {
    this.changeEmail = this.formChangeEmailService.getChangeEmailForm();
  } */
}
