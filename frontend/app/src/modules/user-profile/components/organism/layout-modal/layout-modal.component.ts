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
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, TitleComponent } from '@ui/components';
import { SwitchService } from '../../../../../utils';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent, TitleComponent],
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
  @Output() buttonOneClick = new EventEmitter<void>();
  @Output() buttonTwoClick = new EventEmitter<void>();

  private modalService = inject(SwitchService);

  closeModal() {
    this.modalService.$modal.emit(false);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onButtonOneClick() {
    this.buttonOneClick.emit();
  }

  onButtonTwoClick() {
    this.buttonTwoClick.emit();
  }
}
