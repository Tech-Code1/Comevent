import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'icon-circle-check',
  imports: [CommonModule],
  templateUrl: './icon-circle-check.component.html',
  styleUrls: ['./icon-circle-check.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCircleCheckComponent {}
