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
  selector: 'modal-change-user-name',
  templateUrl: './modal-change-user-name.component.html',
  styleUrls: ['./modal-change-user-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalChangeUserNameComponent implements OnInit {
  @Input({ required: true }) userNameControl!: FormGroup;
  protected formChangeTrackingService = inject(FormChangeTrackingService);

  ngOnInit(): void {
    this.formChangeTrackingService.monitorInputChanges(this.userNameControl, [
      'userName',
    ]);
    this.formChangeTrackingService.setOriginalValues(this.userNameControl);
  }

  resetForm = () =>
    this.formChangeTrackingService.resetToOriginalValues(this.userNameControl);
  isInputChanged = () => !this.formChangeTrackingService.isInputChanged;
}
