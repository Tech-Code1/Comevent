import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'icon-arrow-right-profile',
  imports: [CommonModule],
  templateUrl: './icon-arrow-right-profile.component.html',
  styleUrls: ['./icon-arrow-right-profile.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconArrowRightProfileComponent {}
