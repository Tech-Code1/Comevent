import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent, LabelComponent } from '@ui/components';
import { FormChnagePassService } from '../../..';
import { FormUtilitiesService } from '../../../../../utils';
import { LayoutModalComponent } from '../layout-modal/layout-modal.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModalComponent,
    LabelComponent,
    InputComponent,
  ],
  selector: 'modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ModalChangePasswordComponent implements OnInit {
  protected formUtilities = inject(FormUtilitiesService);
  protected formChnagePassService = inject(FormChnagePassService);
  changePass!: FormGroup;

  ngOnInit(): void {
    this.changePass = this.formChnagePassService.getChangePasswordForm();
  }

  /* protected formUtilities = inject(FormUtilitiesService);
  private formBuilder = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  changePass!: FormGroup;

  customValidator!: ValidatorFn;

  ngOnInit(): void {
    this.customValidator = this.validatorsService.similarInputs(
      'password',
      'passRepeat'
    );

    this.changePass = this.formBuilder.group(
      {
        pass: [''],
        password: [''],
        passRepeat: [''],
      },
      {
        validators: this.customValidator,
      }
    );
  } */
}
