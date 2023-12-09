import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IEditProfile, IEditProfileFormData } from '../../types';
import { UserProfileStateService } from './user.state.service';
// Importa otros servicios y modelos necesarios

@Injectable({
  providedIn: 'root',
})
export class UserProfileUpdateService {
  userProfileStateService = inject(UserProfileStateService);

  updateProfile(editProfileForm: FormGroup) {
    if (editProfileForm.valid) {
      const profileData: IEditProfile = this.prepareProfileData(
        editProfileForm.value
      );
      this.userProfileStateService.onUpdateProfile(profileData);
    } else {
      // Manejar el caso de formulario no válido, por ejemplo, mostrar un mensaje de error
    }
  }

  private prepareProfileData(formData: IEditProfileFormData) {
    // Realiza transformaciones específicas aquí
    // Por ejemplo:

    // Transformar campos de redes sociales en un formato específico
    /* const socialNetworksFormatted: ISocialNetworks[] = Object.entries(
      formData.socialNetworks || {}
    ).map(([platform, link]) => ({ platform, link: link as string })); */

    // Eliminar campos innecesarios o sensibles antes de enviar
    const {
      changePassword: { currentPassword, ...passwordRest },
      ...rest
    } = formData;

    const dataToSend: Partial<IEditProfileFormData> & {
      currentPassword?: string;
    } = {
      ...rest,
      moreInformation: {
        ...formData.moreInformation,
      },
      changePassword: passwordRest,
    };

    if (currentPassword) {
      dataToSend.currentPassword = currentPassword;
    }

    console.log('dataToSend', dataToSend);

    return dataToSend;
  }
}
