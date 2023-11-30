import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'icon-circle-arrow-left',
  imports: [CommonModule],
  templateUrl: './icon-circle-arrow-left.component.html',
  styleUrls: ['./icon-circle-arrow-left.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCircleArrowLeftComponent {}
