import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from '@ui/components';
import { ValidatorsService } from '@utils';
import { RegisterStateService, RegisterUtilsService } from '../..';
import {
  FormRegisterStepOneModule,
  FormRegisterStepThreeModule,
  FormRegisterStepTwoModule,
} from '../../components';
import { IRegisterData } from '../../types';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormRegisterStepOneModule,
    FormRegisterStepTwoModule,
    FormRegisterStepThreeModule,
    TitleComponent,
    InputComponent,
    LabelComponent,
    ButtonComponent,
  ],
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  protected validatorsService = inject(ValidatorsService);
  protected registerUtils = inject(RegisterUtilsService);
  protected registerState = inject(RegisterStateService);
  customValidator!: ValidatorFn;
  minSelectedValidator!: ValidatorFn;

  ngOnInit(): void {
    this.registerUtils.initializeForm();
  }

  get formRegister() {
    return this.registerUtils.getForm();
  }

  next() {
    if (this.registerUtils.step() === 1) {
      if (!this.formRegister.get('stepOne')?.valid) {
        this.registerUtils.markAllAsTouched(
          this.formRegister.get('stepOne') as FormGroup
        );
        return;
      }
      this.registerUtils.step.update((value) => ++value);
    } else if (this.registerUtils.step() === 2) {
      if (!this.formRegister.get('stepTwo')?.valid) {
        this.registerUtils.markAllAsTouched(
          this.formRegister.get('stepTwo') as FormGroup
        );
        return;
      }
      this.registerUtils.step.update((value) => ++value);
    }
  }

  submit(event: Event) {
    if (this.formRegister.valid) {
      const formData = this.formRegister.getRawValue();
      const registerData: IRegisterData = {
        username: formData.stepOne.nick,
        email: formData.stepOne.email,
        password: formData.stepTwo.password,
        areasOfInterest: formData.stepThree.areaOfInterest,
      };
      this.registerState.onRegister(registerData);
    }
  }

  onButtonClick(event: Event): void {
    if (this.registerUtils.step() === 3) {
      this.submit(event);
    } else {
      this.next();
    }
  }
}