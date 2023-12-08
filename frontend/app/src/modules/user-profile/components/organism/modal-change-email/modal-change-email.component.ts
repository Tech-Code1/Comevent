import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class ModalChangeEmailComponent implements OnInit {
  protected formChangeEmailService = inject(FormChangeEmailService);
  @Input({ required: true }) changeEmail!: FormGroup;

  ngOnInit(): void {
    this.changeEmail = this.formChangeEmailService.getChangeEmailForm();
  }
}
