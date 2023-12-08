import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class ModalChangePasswordComponent implements OnInit {
  protected formChangePassService = inject(FormChangePassService);
  @Input({ required: true }) changePassword!: FormGroup;

  ngOnInit(): void {
    this.changePassword = this.formChangePassService.getChangePasswordForm();
  }
}
