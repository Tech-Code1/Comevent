import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  IconArrowRightProfileComponent,
  IconKeyComponent,
  IconMailComponent,
  IconUserProfileComponent,
} from '@ui/components';
import { UserProfileStateService } from '../../..';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconUserProfileComponent,
    IconMailComponent,
    IconKeyComponent,
    TranslateModule,
    IconArrowRightProfileComponent,
  ],
  selector: 'c-button-change-main-info',
  templateUrl: './button-change-main-info.component.html',
  styleUrls: ['./button-change-main-info.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ButtonChangeMainInfoComponent {
  @Input({ required: true }) icon: string = '';
  @Input({ required: true }) title: string = '';

  public userProfileStateService = inject(UserProfileStateService);
}
