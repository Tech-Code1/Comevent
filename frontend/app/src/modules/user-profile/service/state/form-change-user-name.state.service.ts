import { Injectable, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserProfileStateService } from '.';
import { MODALS } from '../../../../common/constants';
import { ModalManagerService } from '../../../../utils';

@Injectable({ providedIn: 'root' })
export class FormChangeUserNameService implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  public userProfileStateService = inject(UserProfileStateService);
  private modalManagerService = inject(ModalManagerService);
  private destroy$ = new Subject<void>();

  inputChanged = false;
  changeUserNameForm!: FormGroup;
  private originalValues!: any;
  private initialValue: string | null | undefined;

  constructor() {
    this.initializeForm();
    this.changeInput();
  }

  private initializeForm() {
    this.changeUserNameForm = this.formBuilder.group({
      userName: [
        this.userProfileStateService.dataUserEditProfile().email || '',
      ],
      pass: [''],
    });

    // Almacenar los valores originales
    this.originalValues = this.changeUserNameForm.value;
    this.initialValue =
      this.userProfileStateService.dataUserEditProfile().email || '';
  }

  get isInputChanged(): boolean {
    return this.inputChanged;
  }

  openChangeUserNameModal() {
    this.modalManagerService.openModal(MODALS.USER_NAME_MODAL);
  }

  getChangeUserNameForm(): FormGroup {
    return this.changeUserNameForm;
  }

  changeInput(): void {
    this.changeUserNameForm
      .get('userName')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.inputChanged = value !== this.initialValue;
      });
  }

  resetToOriginalValues() {
    this.changeUserNameForm.reset(this.originalValues);
    this.initialValue = this.originalValues.userName;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
