import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SwitchService, ValidatorsService } from '../../../../../utils';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss'],
})
export class ModalChangePasswordComponent implements OnInit {
  changePass!: FormGroup;

  constructor(
    private modalService: SwitchService,
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

  closeModal() {
    this.modalService.$modal.emit(false);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  isValid(inputName: string): boolean | undefined | void {
    if (this.changePass.get(inputName)?.touched) {
      return this.changePass.get(inputName)?.valid;
    }
    return true;
  }
}
