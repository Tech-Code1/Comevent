import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalChangeEmailComponent {
  @Input({ required: true }) emailControl!: FormGroup;
  protected formChangeEmailService = inject(FormChangeEmailService);
}
