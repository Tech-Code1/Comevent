import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'modal-change-nick',
  templateUrl: './modal-change-nick.component.html',
  styleUrls: ['./modal-change-nick.component.scss'],
})
export class ModalChangeNickComponent implements OnInit {
  @Input()
  nick!: string | undefined;
  initialValue: string = '';
  inputChanged = false;

  changeNick!: FormGroup;

  constructor(private formbuild: FormBuilder) {}

  ngOnInit(): void {
    this.changeNick = this.formbuild.group({
      nick: [
        this?.nick,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
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

    this.initialValue = this.changeNick.get('nick')?.value;
  }

  closeModal() {}

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  isValid(inputName: string): boolean | undefined | void {
    if (this.changeNick.get(inputName)?.touched) {
      return this.changeNick.get(inputName)?.valid;
    }
    return true;
  }

  changeInput(): boolean {
    this.changeNick.get('nick')?.valueChanges.subscribe((value) => {
      value !== this.initialValue
        ? (this.inputChanged = true)
        : (this.inputChanged = false);
    });
    return this.inputChanged;
  }
}
