import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  ButtonComponent,
  LabelComponent,
  TextAreaComponent,
  TitleComponent,
} from '@ui/components';
import { AvatarComponent, ButtonsActionsChangeMainInfoComponent } from '..';
import {
  FormChangeDescriptionService,
  ISimplifiedUserEditProfile,
} from '../../..';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    TranslateModule,
    AvatarComponent,
    TextAreaComponent,
    LabelComponent,
    ButtonsActionsChangeMainInfoComponent,
    ReactiveFormsModule,
  ],
  selector: 'main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MainInfoComponent implements OnChanges, OnInit {
  @Input({ required: true }) dataUserEditProfile!: ISimplifiedUserEditProfile;
  @Input({ required: true }) loadingProfile!: boolean;

  protected formchangeDescriptionService = inject(FormChangeDescriptionService);
  changeDescription!: FormGroup;

  ngOnInit(): void {
    this.changeDescription =
      this.formchangeDescriptionService.getchangeDescriptionForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataUserEditProfile']) {
      const currentData = changes['dataUserEditProfile'].currentValue;
      this.formchangeDescriptionService.updateFormWithNewData(currentData);
    }
  }
}
