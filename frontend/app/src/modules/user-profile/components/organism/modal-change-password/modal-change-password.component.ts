import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from '../../../../../utils';
import { LayoutModalComponent } from '../layout-modal/layout-modal.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LayoutModalComponent],
  selector: 'modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss'],
})
export class ModalChangePasswordComponent implements OnInit {
  changePass!: FormGroup;

  constructor(
    private formbuild: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.changePass = this.formbuild.group(
      {
        pass: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        repeatPass: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        repeatPassNew: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
      },
      {
        validator: this.validatorsService.similarInputs(
          'repeatPass',
          'repeatPassNew'
        ),
      } as AbstractControlOptions
    );
  }

  isValid(inputName: string): boolean | undefined | void {
    if (this.changePass.get(inputName)?.touched) {
      return this.changePass.get(inputName)?.valid;
    }
    return true;
  }
}
