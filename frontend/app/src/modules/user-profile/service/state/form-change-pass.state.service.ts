import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { MODALS } from '../../../../common/constants';
import { ModalManagerService, ValidatorsService } from '../../../../utils';

@Injectable({ providedIn: 'root' })
export class FormChangePassService {
  private formBuilder = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private modalManagerService = inject(ModalManagerService);

  customValidator: ValidatorFn = this.validatorsService.similarInputs(
    'password',
    'passRepeat'
  );

  private changePasswordForm = this.formBuilder.group(
    {
      pass: [''],
      password: [''],
      passRepeat: [''],
    },
    {
      validators: this.customValidator,
    }
  );

  openChangePasswordModal() {
    this.modalManagerService.openModal(MODALS.PASSWORD_MODAL);
  }

  getChangePasswordForm(): FormGroup {
    return this.changePasswordForm;
  }

  resetChangePasswordForm() {
    this.changePasswordForm.reset({
      pass: '',
      password: '',
      passRepeat: '',
    });
  }
}