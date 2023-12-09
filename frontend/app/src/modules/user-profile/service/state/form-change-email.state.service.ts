import { Injectable, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserProfileStateService } from '.';
import { MODALS } from '../../../../common/constants';
import { ModalManagerService } from '../../../../utils';

@Injectable({ providedIn: 'root' })
export class FormChangeEmailService implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  public userProfileStateService = inject(UserProfileStateService);
  private modalManagerService = inject(ModalManagerService);
  private destroy$ = new Subject<void>();

  inputChanged = false;
  changeEmailForm!: FormGroup;
  private originalValues!: any;
  private initialValue: string | null | undefined;

  constructor() {
    this.initializeForm();
    this.changeInput();
  }

  private initializeForm() {
    this.changeEmailForm = this.formBuilder.group({
      email: [this.userProfileStateService.dataUserEditProfile().email || ''],
      pass: [''],
    });

    // Almacenar los valores originales
    this.originalValues = this.changeEmailForm.value;
    this.initialValue =
      this.userProfileStateService.dataUserEditProfile().email || '';
  }

  openChangeUserNameModal() {
    this.modalManagerService.openModal(MODALS.EMAIL_MODAL);
  }

  getChangeEmailForm(): FormGroup {
    return this.changeEmailForm;
  }

  changeInput(): void {
    this.changeEmailForm
      .get('email')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.inputChanged = value !== this.initialValue;
      });
  }

  get isInputChanged(): boolean {
    console.log('isInputChanged', this.isInputChanged);

    return this.inputChanged;
  }

  resetToOriginalValues() {
    this.changeEmailForm.reset(this.originalValues);
    this.initialValue = this.originalValues.email;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
