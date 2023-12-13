import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import * as lodash from 'lodash';
import { AreasComponent } from '../../components';
import {
  IEditProfileFormData,
  ISocialNetworks,
  IUpdateProfile,
} from '../../types';
import { UserProfileStateService } from './user.state.service';
// Importa otros servicios y modelos necesarios

@Injectable({
  providedIn: 'root',
})
export class UserProfileUpdateService {
  userProfileStateService = inject(UserProfileStateService);

  networks = [
    {
      id: 1,
      network: 'X',
      placeholder: 'Enter your social network X',
    },
    {
      id: 2,
      network: 'Discord',
      placeholder: 'Enter your social network Discord',
    },
    {
      id: 3,
      network: 'LinkedIn',
      placeholder: 'Enter your social network LinkedIn',
    },
    {
      id: 4,
      network: 'Facebook',
      placeholder: 'Enter your social network Facebook',
    },
    {
      id: 5,
      network: 'Github',
      placeholder: 'Enter your social network Github',
    },
    {
      id: 6,
      network: 'Instagram',
      placeholder: 'Enter your social network Instagram',
    },
  ];

  private processControl(
    control: AbstractControl,
    originalValue: any,
    changes: Record<string, any>,
    controlKey: string
  ) {
    if (control instanceof FormGroup) {
      // ? Manejo de FormGroup anidado
      Object.keys(control.controls).forEach((nestedKey) => {
        this.processControl(
          control.get(nestedKey)!,
          originalValue[nestedKey],
          changes,
          nestedKey
        );
      });
    } else if (control instanceof FormArray) {
      // ? Manejo específico para FormArray
      const currentValues = control.controls.map((c) => c.value);
      if (!lodash.isEqual(currentValues, originalValue)) {
        changes[controlKey] = currentValues;
      }
    } else {
      // ? Para FormControl individual
      if (control.dirty && !lodash.isEqual(control.value, originalValue)) {
        changes[controlKey] = control.value;
      }
    }
  }

  updateProfile(
    editProfileForm: FormGroup,
    originalValues: IEditProfileFormData,
    areasComponent: AreasComponent
  ) {
    if (editProfileForm.valid) {
      const currentValues = editProfileForm.value as Record<string, any>;
      const originalValuesRecord = originalValues as Record<string, any>;

      console.log('current values: **', currentValues);
      console.log('original values: **', originalValuesRecord);

      const changes: Record<string, any> = {};

      Object.keys(editProfileForm.controls).forEach((controlKey) => {
        const control = editProfileForm.get(controlKey);
        if (control) {
          this.processControl(
            control,
            originalValuesRecord[controlKey] || {},
            changes,
            controlKey
          );
        }
      });

      console.log(changes, 'changes');

      if (Object.keys(changes).length > 0) {
        const profileData: Partial<IUpdateProfile> = this.prepareProfileData(
          areasComponent,
          changes
        );
        this.userProfileStateService.onUpdateProfile(profileData);
      } else {
        console.log('No changes to update');
        // Manejar el caso en que no hay cambios
      }
    } else {
      // Manejar el caso de formulario no válido
    }
  }

  private prepareProfileData(
    areasComponent: AreasComponent,
    changes: Record<string, any>
  ): Partial<IUpdateProfile> {
    const formData: Partial<IEditProfileFormData> = {};

    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        formData[key as keyof IEditProfileFormData] = changes[key];
      }
    }

    if (changes['mainInfo']) {
      const mainInfo = changes['mainInfo'];

      if (mainInfo.changeEmail) {
        formData.changeEmail = mainInfo.changeEmail;
      }
      if (mainInfo.changeUserName) {
        formData.changeUserName = mainInfo.changeUserName;
      }
      if (mainInfo.changePassword) {
        formData.changePassword = mainInfo.changePassword;
      }
    }

    if (changes['moreInfo']) {
      const moreInfoChanges = changes['moreInfo'];
      Object.keys(moreInfoChanges).forEach((key) => {
        const change = moreInfoChanges[key];
        if (change !== null && change !== undefined) {
          if (!formData.moreInfo) {
            formData.moreInfo = {};
          }
          formData.moreInfo[key as keyof typeof formData.moreInfo] = change;
        }
      });
    }

    if (changes['socialNetworkInfo']) {
      formData.socialNetworks = this.networks
        .map((network) => {
          const networkKey = `socialNetworkInfo.${network.network.toLowerCase()}`;
          if (changes[networkKey]) {
            return {
              link: changes[networkKey],
              platform: network.network,
            };
          }
          return undefined;
        })
        .filter((network): network is ISocialNetworks => network !== undefined);
    }

    if (changes['selectedAreas']) {
      const selectedAreas = areasComponent.getSelectedAreasData();
      if (!formData.areasInfo) {
        formData.areasInfo = {};
      }
      formData.areasInfo.areaOfExpertise = selectedAreas.areaOfExpertise;
      formData.areasInfo.areaOfInteres = selectedAreas.areaOfInterest;
    }

    console.log('formData', formData);

    return formData;
  }
}
