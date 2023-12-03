import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, TitleComponent } from '@ui/components';
import { IconClearComponent } from '../../../../../../../ui/components/atoms/icons/icon-clear/icon-clear.component';
import { ModalManagerService } from '../../../../../utils';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ButtonComponent,
    TitleComponent,
    IconClearComponent,
  ],
  selector: 'layout-modal',
  templateUrl: './layout-modal.component.html',
  styleUrls: ['./layout-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LayoutModalComponent {
  @Input() titleModal!: string;
  @Input() footer: boolean = false;
  @Input() numberOfButtons: number = 0;
  @Input() titleButtonOne: string = '';
  @Input() titleButtonTwo: string = '';
  @Input() info: string = '';
  @Input() form!: FormGroup;
  @Output() buttonOneClick = new EventEmitter<void>();
  @Input() resetFormFunction!: () => void;
  @Input() isInputChanged = false;

  protected modalManagerService = inject(ModalManagerService);

  closeModal() {
    if (this.form) {
      this.resetFormFunction();
    }
    this.modalManagerService.closeModal();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onButtonOneClick() {
    if (this.form) {
      this.resetFormFunction();
    }
    this.buttonOneClick.emit();
  }

  isButtonDisabled(): boolean {
    if (this.form && this.isInputChanged !== undefined) {
      return !this.form.valid || this.isInputChanged;
    }

    if (this.form) {
      return !this.form.valid;
    }

    if (this.isInputChanged !== undefined) {
      return this.isInputChanged;
    }

    return false;
  }
}
