import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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
  selector: 'modal-change-email',
  templateUrl: './modal-change-email.component.html',
  styleUrls: ['./modal-change-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalChangeEmailComponent implements OnInit {
  @Input({ required: true }) emailControl!: FormGroup;
  protected formChangeTrackingService = inject(FormChangeTrackingService);

  ngOnInit(): void {
    this.formChangeTrackingService.monitorInputChanges(this.emailControl, [
      'email',
    ]);
    this.formChangeTrackingService.setOriginalValues(this.emailControl);
  }

  resetForm = () =>
    this.formChangeTrackingService.resetToOriginalValues(this.emailControl);
  isInputChanged = () => !this.formChangeTrackingService.isInputChanged;
}
