import { Injectable, OnDestroy, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserProfileStateService } from '.';
import { ISimplifiedUserEditProfile } from '../..';

@Injectable({ providedIn: 'root' })
export class FormChangeAreasService implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  public userProfileStateService = inject(UserProfileStateService);
  private destroy$ = new Subject<void>();

  inputChanged = false;
  changeAreasForm!: FormGroup;
  private originalValues!: any;
  private initialValues: { [key: string]: string } = {};

  constructor() {
    this.initializeForm();
  }

  private initializeForm() {
    // Inicializar el formulario con valores vacíos
    const formControls = {
      areaOfExpertise: this.formBuilder.array([]),
      areaOfInteres: this.formBuilder.array([]),
    };

    this.changeAreasForm = this.formBuilder.group(formControls);
    this.originalValues = this.changeAreasForm.value;

    this.changeInputs();
  }

  updateFormWithNewData(data: ISimplifiedUserEditProfile) {
    if (!this.changeAreasForm) {
      this.initializeForm();
    }

    // Actualizar el FormArray para areaOfExpertise
    const areaOfExpertiseArray = this.changeAreasForm.get(
      'areaOfExpertise'
    ) as FormArray;
    areaOfExpertiseArray.clear(); // Limpia el FormArray existente
    data.areaOfExpertise?.forEach((area) => {
      areaOfExpertiseArray.push(new FormControl(area));
    });

    // Actualizar el FormArray para areaOfInteres
    const areaOfInteresArray = this.changeAreasForm.get(
      'areaOfInteres'
    ) as FormArray;
    areaOfInteresArray.clear(); // Limpia el FormArray existente
    data.areaOfInteres?.forEach((area) => {
      areaOfInteresArray.push(new FormControl(area));
    });

    this.originalValues = this.changeAreasForm.value;
    this.inputChanged = false;
  }

  get isInputChanged(): boolean {
    return this.inputChanged;
  }

  getchangeAreasForm(): FormGroup {
    return this.changeAreasForm;
  }

  changeInputs(): void {
    Object.keys(this.initialValues).forEach((key) => {
      this.changeAreasForm
        .get(key)
        ?.valueChanges.pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          this.inputChanged =
            this.inputChanged || value !== this.originalValues[key];
        });
    });
  }

  resetToOriginalValues() {
    this.changeAreasForm.reset(this.originalValues);
    this.inputChanged = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
