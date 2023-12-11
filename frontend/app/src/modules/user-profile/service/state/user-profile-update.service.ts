import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as lodash from 'lodash';
import { getFormControlValueAsType } from '../../../../utils';
import { AreasComponent } from '../../components';
import {
  IEditProfileFormData,
  IFormMoreInfo,
  IUpdateProfile,
  IUserUpdateForm,
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

  updateProfile(
    editProfileForm: FormGroup,
    originalValues: IEditProfileFormData,
    areasComponent: AreasComponent
  ) {
    if (editProfileForm.valid) {
      const currentValues = editProfileForm.value as Record<string, any>;
      const originalValuesRecord = originalValues as Record<string, any>;

      console.log('current values:', currentValues);
      console.log('original values:', originalValuesRecord);

      const changes: Record<string, any> = {};

      console.log(changes, 'changes');

      Object.keys(currentValues).forEach((key) => {
        if (
          key in originalValuesRecord &&
          !lodash.isEqual(currentValues[key], originalValuesRecord[key])
        ) {
          changes[key] = currentValues[key];
        }
      });

      console.log(changes, 'changes');

      if (Object.keys(changes).length > 0) {
        const profileData: Partial<IUpdateProfile> = this.prepareProfileData(
          editProfileForm,
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
    editProfileForm: FormGroup,
    areasComponent: AreasComponent,
    changes: Record<string, any>
  ): Partial<IUpdateProfile> {
    const mainInfo = getFormControlValueAsType<IUserUpdateForm>(
      editProfileForm,
      'mainInfo'
    );

    const changeEmail = mainInfo!.changeEmail.value;
    const changeUserName = mainInfo!.changeUserName.value;
    const changePassword = mainInfo!.changePassword.value;

    const moreInfo = getFormControlValueAsType<IFormMoreInfo>(
      editProfileForm,
      'moreInfo'
    );

    const socialNetworksToSend = this.networks
      .map((network) => {
        const control = editProfileForm.get(
          `socialNetworkInfo.${network.network.toLowerCase()}`
        );

        return {
          link: control?.value || null,
          platform: network.network,
        };
      })
      .filter((network) => network.link);

    const selectedAreas = areasComponent.getSelectedAreasData();

    const formData = {
      areaOfExpertise: selectedAreas.areaOfExpertise || null,
      areaOfInterest: selectedAreas.areaOfInterest || null,
      socialNetworks: socialNetworksToSend || null,
      avatar: mainInfo?.avatar?.value || null,
      description: mainInfo?.description?.value || null,
      email: changeEmail?.email || null,
      userName: changeUserName?.userName || null,
      password: changePassword?.password || null,
      pass:
        changeEmail?.pass ||
        changeUserName?.pass ||
        changePassword?.pass ||
        null,
      firstName: moreInfo?.firstName?.value || null,
      lastName: moreInfo?.lastName?.value || null,
      gender: moreInfo?.gender?.value || null,
      bornDate: moreInfo?.bornDate?.value || null,
      specialty: moreInfo?.specialty?.value || null,
      country: moreInfo?.country?.value || null,
    };

    console.log('formData', formData);

    return formData;
  }
}
