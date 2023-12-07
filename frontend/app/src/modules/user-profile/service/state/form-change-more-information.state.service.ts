import { Injectable, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserProfileStateService } from '.';
import { ISimplifiedUserEditProfile } from '../..';

@Injectable({ providedIn: 'root' })
export class FormChangeMoreInformationsService implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  public userProfileStateService = inject(UserProfileStateService);
  private destroy$ = new Subject<void>();

  inputChanged = false;
  changeMoreInformationForm!: FormGroup;
  private originalValues!: any;
  private initialValues: { [key: string]: string } = {};

  constructor() {
    this.initializeForm();
  }

  private initializeForm() {
    // Inicializar el formulario con valores vacíos
    const formControls = {
      firstName: '',
      lastName: '',
      gender: '',
      bornDate: '',
      specialty: '',
      country: '',
    };

    this.changeMoreInformationForm = this.formBuilder.group(formControls);
    this.originalValues = this.changeMoreInformationForm.value;

    this.changeInputs();
  }

  updateFormWithNewData(data: ISimplifiedUserEditProfile) {
    if (!this.changeMoreInformationForm) {
      this.initializeForm();
    }

    this.changeMoreInformationForm.patchValue({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      gender: data.gender || null,
      bornDate: data.bornDate || '',
      specialty: data.specialty || null,
      country: data.country || null,
    });

    this.originalValues = this.changeMoreInformationForm.value;
    this.inputChanged = false;
  }

  get isInputChanged(): boolean {
    return this.inputChanged;
  }

  getchangeMoreInformationForm(): FormGroup {
    return this.changeMoreInformationForm;
  }

  changeInputs(): void {
    Object.keys(this.initialValues).forEach((key) => {
      this.changeMoreInformationForm
        .get(key)
        ?.valueChanges.pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          this.inputChanged =
            this.inputChanged || value !== this.originalValues[key];
        });
    });
  }

  resetToOriginalValues() {
    this.changeMoreInformationForm.reset(this.originalValues);
    this.inputChanged = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
