import { Injectable, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserProfileStateService } from '.';
import { ISimplifiedUserEditProfile } from '../..';

@Injectable({ providedIn: 'root' })
export class FormChangeDescriptionService implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  public userProfileStateService = inject(UserProfileStateService);
  private destroy$ = new Subject<void>();

  inputChanged = false;
  changeDescriptionForm!: FormGroup;
  private originalValues!: any;
  private initialValue: string | null | undefined;

  constructor() {
    this.initializeForm();
  }

  private initializeForm() {
    // Inicializar el formulario con valores vacíos
    const formControls = {
      description: '',
    };

    this.changeDescriptionForm = this.formBuilder.group(formControls);
    this.originalValues = this.changeDescriptionForm.value;

    this.changeInput();
  }

  updateFormWithNewData(data: ISimplifiedUserEditProfile) {
    if (!this.changeDescriptionForm) {
      this.initializeForm();
    }

    this.changeDescriptionForm.patchValue({
      description: data.description || '',
    });

    this.originalValues = this.changeDescriptionForm.value;
    this.inputChanged = false;
  }

  get isInputChanged(): boolean {
    return this.inputChanged;
  }

  getchangeDescriptionForm(): FormGroup {
    return this.changeDescriptionForm;
  }

  changeInput(): void {
    this.changeDescriptionForm
      .get('description')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.inputChanged = value !== this.initialValue;
      });
  }

  resetToOriginalValues() {
    this.changeDescriptionForm.reset(this.originalValues);
    this.inputChanged = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
