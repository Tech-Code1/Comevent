import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IconClearInputType } from './icon-clear.interface';

@Component({
  standalone: true,
  selector: 'icon-clear-input',
  imports: [CommonModule],
  templateUrl: './icon-clear-input.component.html',
  styleUrls: ['./icon-clear-input.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconClearInputComponent implements IconClearInputType {
  @Input() color: IconClearInputType['color'] = 'error';
  @Input() type: IconClearInputType['type'] = 'outlined';
  @Input() parentHovered = false;
}
