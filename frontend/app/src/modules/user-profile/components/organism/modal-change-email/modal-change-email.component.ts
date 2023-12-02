import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'modal-change-email',
  templateUrl: './modal-change-email.component.html',
  styleUrls: ['./modal-change-email.component.scss'],
})
export class ModalChangeEmailComponent implements OnInit {
  @Input() email!: string | undefined;

  initialValue: string = '';
  inputChanged = false;
  changeEmail!: FormGroup;

  constructor(
    private modalService: SwitchService,
    private formbuild: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.changeEmail = this.formbuild.group({
      email: [
        this?.email,
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
          Validators.maxLength(100),
        ],
      ],
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
    } as AbstractControlOptions);

    this.initialValue = this.changeEmail.get('email')?.value;
  }

  closeModal() {
    this.modalService.$modal.emit(false);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  isValid(inputName: string): boolean | undefined | void {
    if (this.changeEmail.get(inputName)?.touched) {
      return this.changeEmail.get(inputName)?.valid;
    }
    return true;
  }

  changeInput(): boolean {
    this.changeEmail.get('email')?.valueChanges.subscribe((value) => {
      value !== this.initialValue
        ? (this.inputChanged = true)
        : (this.inputChanged = false);
    });

    return this.inputChanged;
  }
}
