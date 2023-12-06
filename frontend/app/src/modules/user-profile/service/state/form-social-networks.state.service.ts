import { Injectable, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserProfileStateService } from '.';
import { ISimplifiedUserEditProfile } from '../..';
import { SOCIAL_NETWORK } from '../../../../common/constants';

@Injectable({ providedIn: 'root' })
export class FormChangeSocialNetworksService implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  public userProfileStateService = inject(UserProfileStateService);
  private destroy$ = new Subject<void>();

  inputChanged = false;
  changeSocialNetworkForm!: FormGroup;
  private originalValues!: any;
  private initialValues: { [key: string]: string } = {};

  constructor() {
    this.initializeForm();
  }

  private initializeForm() {
    // Inicializar el formulario con valores vacíos
    const formControls = {
      x: [''],
      discord: [''],
      facebook: [''],
      github: [''],
      linkedin: [''],
      instagram: [''],
    };

    this.changeSocialNetworkForm = this.formBuilder.group(formControls);
    this.originalValues = this.changeSocialNetworkForm.value;

    this.changeInputs();
  }

  updateFormWithNewData(data: ISimplifiedUserEditProfile): void {
    const platforms = [
      SOCIAL_NETWORK.X,
      SOCIAL_NETWORK.DISCORD,
      SOCIAL_NETWORK.FACEBOOK,
      SOCIAL_NETWORK.GITHUB,
      SOCIAL_NETWORK.LINKEDIN,
      SOCIAL_NETWORK.INSTAGRAM,
    ];

    platforms.forEach((platform) => {
      const link =
        data.socialNetworks.find((social) => social.platform === platform)
          ?.link || '';
      this.changeSocialNetworkForm.get(platform.toLowerCase())?.setValue(link);
    });

    this.originalValues = this.changeSocialNetworkForm.value;
    this.inputChanged = false;
  }

  get isInputChanged(): boolean {
    return this.inputChanged;
  }

  getchangeSocialNetworkForm(): FormGroup {
    return this.changeSocialNetworkForm;
  }

  changeInputs(): void {
    Object.keys(this.initialValues).forEach((key) => {
      this.changeSocialNetworkForm
        .get(key)
        ?.valueChanges.pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          this.inputChanged =
            this.inputChanged || value !== this.originalValues[key];
        });
    });
  }

  resetToOriginalValues() {
    this.changeSocialNetworkForm.reset(this.originalValues);
    this.inputChanged = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
