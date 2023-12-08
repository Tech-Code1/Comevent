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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  @Input({ required: true }) dataUserEditProfile!:
    | ISimplifiedUserEditProfile
    | Partial<ISimplifiedUserEditProfile>;
  @Input({ required: true }) loadingProfile!: boolean;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) changeUserName!: FormGroup;
  @Input({ required: true }) changePassword!: FormGroup;
  @Input({ required: true }) changeEmail!: FormGroup;
  @Input({ required: true }) changeAvatar!: FormControl;

  protected formchangeDescriptionService = inject(FormChangeDescriptionService);

  ngOnInit(): void {
    this.formGroup =
      this.formchangeDescriptionService.getchangeDescriptionForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataUserEditProfile']) {
      const currentData = changes['dataUserEditProfile'].currentValue;
      this.formchangeDescriptionService.updateFormWithNewData(currentData);
    }
  }
}
