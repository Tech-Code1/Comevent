import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  IconCircleArrowLeftComponent,
  TitleComponent,
} from '@ui/components';
import {
  AreasComponent,
  IFormMoreInfo,
  IUserUpdateForm,
  MainInfoComponent,
  MoreInformationComponent,
  SocialNetworksComponent,
  UserProfileFormService,
  UserProfileStateService,
  UserProfileUpdateService,
} from '../..';
import { TokenService } from '../../../../common/services/token.service';
import {
  ValidatorsService,
  getFormControlValueAsType,
} from '../../../../utils';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    TitleComponent,
    IconCircleArrowLeftComponent,
    MainInfoComponent,
    RouterModule,
    SocialNetworksComponent,
    AreasComponent,
    MoreInformationComponent,
  ],
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  private tokenService = inject(TokenService);
  private formBuilder = inject(NonNullableFormBuilder);
  public userProfileStateService = inject(UserProfileStateService);
  public userProfileFormService = inject(UserProfileFormService);
  public validatorsService = inject(ValidatorsService);
  private userProfileUpdateService = inject(UserProfileUpdateService);
  editProfileForm!: FormGroup;
  @ViewChild(AreasComponent) areasComponent!: AreasComponent;
  socialNetworksData: { [key: string]: { link: string; platform: string } } =
    {};

  ngOnInit(): void {
    const userId = this.tokenService.getUserIdFromToken();

    if (userId) {
      this.userProfileStateService.onDataUserEditProfile(userId);
    }

    this.userProfileStateService.onDataCountries();
    this.userProfileStateService.onDataSpecialties();

    this.editProfileForm = new FormGroup({});
  }

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

  saveData() {
    const mainInfo = getFormControlValueAsType<IUserUpdateForm>(
      this.editProfileForm,
      'mainInfo'
    );

    const changeEmail = mainInfo!.changeEmail.value;
    const changeUserName = mainInfo!.changeUserName.value;
    const changePassword = mainInfo!.changePassword.value;

    const moreInfo = getFormControlValueAsType<IFormMoreInfo>(
      this.editProfileForm,
      'moreInfo'
    );

    const socialNetworksToSend = this.networks
      .map((network) => {
        const control = this.editProfileForm.get(
          `socialNetworkInfo.${network.network.toLowerCase()}`
        );

        return {
          link: control?.value || null,
          platform: network.network,
        };
      })
      .filter((network) => network.link);

    const selectedAreas = this.areasComponent.getSelectedAreasData();

    const formData = {
      areaOfExpertise: selectedAreas.areaOfExpertise,
      areaOfInterest: selectedAreas.areaOfInterest,
      socialNetworks: socialNetworksToSend,
      avatar: mainInfo?.avatar || null,
      description: mainInfo?.description || null,
      email: changeEmail?.email || null,
      userName: changeUserName?.userName || null,
      password: changePassword?.password || null,
      pass:
        changeEmail?.pass ||
        changeUserName?.pass ||
        changePassword?.pass ||
        null,
      firstName: moreInfo?.firstName || null,
      lastName: moreInfo?.lastName || null,
      gender: moreInfo?.gender || null,
      bornDate: moreInfo?.bornDate || null,
      specialty: moreInfo?.specialty || null,
      country: moreInfo?.country || null,
    };

    console.log('formData', formData);

    //return formData;
  }
}
