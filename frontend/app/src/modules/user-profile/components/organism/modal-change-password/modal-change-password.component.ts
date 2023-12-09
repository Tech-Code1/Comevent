import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormChangeTrackingService } from '@services';
import { InputComponent, LabelComponent } from '@ui/components';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalChangePasswordComponent implements OnInit {
  @Input({ required: true }) passwordControl!: FormGroup;
  protected formChangeTrackingService = inject(FormChangeTrackingService);

  ngOnInit(): void {
    this.formChangeTrackingService.setOriginalValues(this.passwordControl);
  }

  resetForm = () =>
    this.formChangeTrackingService.resetToOriginalValues(this.passwordControl);
}
