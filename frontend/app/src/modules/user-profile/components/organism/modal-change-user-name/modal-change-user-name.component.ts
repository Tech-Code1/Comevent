import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent, LabelComponent } from '@ui/components';
import { FormChangeUserNameService } from '../../../service/state';
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
  selector: 'modal-change-user-name',
  templateUrl: './modal-change-user-name.component.html',
  styleUrls: ['./modal-change-user-name.component.scss'],
})
export class ModalChangeUserNameComponent {
  protected formChangeUserNameService = inject(FormChangeUserNameService);
  //@Input({ required: true }) changeUserName!: FormGroup;

  /* ngOnInit(): void {
    this.changeUserName =
      this.formChangeUserNameService.getChangeUserNameForm();
  } */
}
