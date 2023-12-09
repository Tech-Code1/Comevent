import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalChangeUserNameComponent {
  protected formChangeUserNameService = inject(FormChangeUserNameService);
  //@Input({ required: true }) changeUserName!: FormGroup;
  @Input({ required: true }) userNameControl!: FormGroup;

  /* ngOnInit(): void {
    this.changeUserName =
      this.formChangeUserNameService.getChangeUserNameForm();
  } */
}
