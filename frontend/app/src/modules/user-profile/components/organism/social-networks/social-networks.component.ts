import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  IconDiscordComponent,
  IconFacebookTwoComponent,
  IconGithubTwoComponent,
  IconInstagramTwoComponent,
  IconLinkedinTwoComponent,
  IconXComponent,
  InputComponent,
  TitleComponent,
} from '@ui/components';
import { IFormSocialNetworks, ISimplifiedUserEditProfile } from '../../..';
import { SOCIAL_NETWORK } from '../../../../../common/constants';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    TranslateModule,
    InputComponent,
    IconFacebookTwoComponent,
    IconInstagramTwoComponent,
    IconDiscordComponent,
    IconLinkedinTwoComponent,
    IconGithubTwoComponent,
    IconXComponent,
    ReactiveFormsModule,
  ],
  selector: 'social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class SocialNetworksComponent implements OnInit, OnChanges {
  @Input({ required: true }) dataUserEditProfile!:
    | ISimplifiedUserEditProfile
    | Partial<ISimplifiedUserEditProfile>;
  @Input({ required: true }) loadingProfile!: boolean;
  @Input({ required: true }) controlKey = '';
  private formBuilder = inject(NonNullableFormBuilder);
  private parentContainer = inject(ControlContainer);

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      this.formBuilder.group<IFormSocialNetworks>({
        x: this.formBuilder.control(null),
        discord: this.formBuilder.control(null),
        facebook: this.formBuilder.control(null),
        github: this.formBuilder.control(null),
        linkedin: this.formBuilder.control(null),
        instagram: this.formBuilder.control(null),
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataUserEditProfile'] && this.dataUserEditProfile) {
      this.updateFormWithUserProfileData();
    }
  }

  getNetwork(platform: string) {
    if (this.dataUserEditProfile.socialNetworks) {
      return (
        this.dataUserEditProfile.socialNetworks.find(
          (social) => social.platform === platform
        )?.link || ''
      );
    }
    return;
  }

  updateFormWithUserProfileData(): void {
    if (this.dataUserEditProfile) {
      this.parentFormGroup.patchValue({
        [this.controlKey]: {
          x: this.getNetwork(SOCIAL_NETWORK.X),
          discord: this.getNetwork(SOCIAL_NETWORK.DISCORD),
          facebook: this.getNetwork(SOCIAL_NETWORK.FACEBOOK),
          github: this.getNetwork(SOCIAL_NETWORK.GITHUB),
          linkedin: this.getNetwork(SOCIAL_NETWORK.LINKEDIN),
          instagram: this.getNetwork(SOCIAL_NETWORK.INSTAGRAM),
        },
      });
    }
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
}
