import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import * as lodash from 'lodash';
import { Subject, takeUntil } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormChangeTrackingService implements OnDestroy {
  private destroy$ = new Subject<void>();
  inputChanged = false;
  private originalValues!: any;

  get isInputChanged(): boolean {
    return this.inputChanged;
  }

  monitorInputChanges(
    control: AbstractControl,
    keysToMonitor?: string[]
  ): void {
    control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentValues) => {
        // Si no se proporcionan claves específicas, usar todas las claves del FormGroup
        const keys = keysToMonitor || Object.keys(currentValues);
        const currentSubset = this.extractSubset(currentValues, keys);
        const originalSubset = this.extractSubset(this.originalValues, keys);
        this.inputChanged = !lodash.isEqual(currentSubset, originalSubset);
      });
  }

  private extractSubset(
    obj: Record<string, any>,
    keys: string[]
  ): Record<string, any> {
    return keys.reduce((subset, key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        subset[key] = obj[key];
      }
      return subset;
    }, {} as Record<string, any>);
  }

  setOriginalValues(formGroup: FormGroup): void {
    this.originalValues = formGroup.value;
  }

  resetToOriginalValues(formGroup: FormGroup) {
    formGroup.reset(this.originalValues);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
