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
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import {
  FormChangeSocialNetworksService,
  ISimplifiedUserEditProfile,
} from '../../..';

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
})
export class SocialNetworksComponent implements OnChanges, OnInit {
  @Input({ required: true }) dataUserEditProfile!:
    | ISimplifiedUserEditProfile
    | Partial<ISimplifiedUserEditProfile>;
  @Input({ required: true }) loadingProfile!: boolean;
  @Input({ required: true }) formGroup!: FormGroup;

  protected formChangeSocialNetworksService = inject(
    FormChangeSocialNetworksService
  );

  ngOnInit(): void {
    this.formGroup =
      this.formChangeSocialNetworksService.getchangeSocialNetworkForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataUserEditProfile']) {
      const currentData = changes['dataUserEditProfile'].currentValue;
      this.formChangeSocialNetworksService.updateFormWithNewData(currentData);
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
