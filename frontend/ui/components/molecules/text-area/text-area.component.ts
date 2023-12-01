import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { startWith, takeUntil, tap } from 'rxjs';
import { IconClearComponent } from '../..';
import { LabelComponent } from '../../atoms';
import { ErrorInputComponent } from '../../atoms/error-input/error-input.component';
import { ControlValueAccesorDirective } from '../../shared/directives/control-value-accesor.directive';
import { TextAreaType } from './text-area.interface';

@Component({
  standalone: true,
  selector: 'c-text-area',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorInputComponent,
    LabelComponent,
    IconClearComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TextAreaComponent<T>
  extends ControlValueAccesorDirective<T>
  implements TextAreaType, OnInit
{
  @Input({ required: true }) id = '';
  @Input({ required: true }) variant: TextAreaType['variant'] =
    'text-area-base';
  @Input({ required: true }) placeholder: string = 'Entry text';
  @Input() value?: string | number | undefined;
  @Input() customErrorMessages: Record<string, string> = {};
  @Input({ required: true }) name!: string;
  @Input({ required: true }) maxCharacters: number = 200;
  @Input()
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  currentCharacters: number = 0;

  override ngOnInit(): void {
    super.ngOnInit(); // Llama a ngOnInit de la clase base

    if (this.control) {
      this.control.valueChanges
        .pipe(
          takeUntil(this._destroy$),
          startWith(this.control.value),
          tap((value) => {
            this.currentCharacters = value ? value.length : 0;
          })
        )
        .subscribe();
    }
  }

  clearInput() {
    if (this.control) {
      this.control.setValue('');
    }
  }
}
