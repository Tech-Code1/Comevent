import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TitleComponent } from '../../atoms';
import { IconCircleCheckComponent } from '../../atoms/icons';
import { ChipSelectType } from './chip-select.interface';

@Component({
  standalone: true,
  selector: 'c-chip-select',
  imports: [CommonModule, TitleComponent, IconCircleCheckComponent],
  templateUrl: './chip-select.component.html',
  styleUrls: ['./chip-select.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipSelectComponent implements ChipSelectType {
  public isHovered = false;
  @Input() colorText: ChipSelectType['colorText'] = 'black';
  @Input() disabled = false;
  @Input({ required: true }) select = false;
  @Input() hover = true;
  @Input({ required: true }) title!: string;

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.disabled) {
      this.isHovered = true;
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.disabled) {
      this.isHovered = false;
    }
  }
}
