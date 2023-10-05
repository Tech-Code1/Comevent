import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ButtonComponent,
  ChipComponent,
  IconFacebookComponent,
  IconGoogleComponent,
  LabelComponent,
  SelectComponent,
  TitleComponent,
} from '@ui/components';
import { FormRegisterStepThreeComponent } from './register-step-three.component';

@NgModule({
  declarations: [FormRegisterStepThreeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TitleComponent,
    SelectComponent,
    LabelComponent,
    ButtonComponent,
    IconGoogleComponent,
    IconFacebookComponent,
    ChipComponent,
  ],
  exports: [FormRegisterStepThreeComponent],
})
export class FormRegisterStepThreeModule {}