import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormChangeTrackingService } from '@services';
import {
  ButtonComponent,
  IconCircleArrowLeftComponent,
  TitleComponent,
} from '@ui/components';
import {
  AreasComponent,
  IEditProfileFormData,
  MainInfoComponent,
  MoreInformationComponent,
  SocialNetworksComponent,
  UserProfileStateService,
  UserProfileUpdateService,
} from '../..';
import { TokenService } from '../../../../common/services/token.service';
import { ValidatorsService } from '../../../../utils';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent implements OnInit, AfterViewInit {
  private tokenService = inject(TokenService);
  public userProfileStateService = inject(UserProfileStateService);
  public validatorsService = inject(ValidatorsService);
  private userProfileUpdateService = inject(UserProfileUpdateService);
  editProfileForm!: FormGroup;
  originalValues!: IEditProfileFormData;
  protected formChangeTrackingService = inject(FormChangeTrackingService);
  @ViewChild(AreasComponent) areasComponent!: AreasComponent;

  ngOnInit(): void {
    const userId = this.tokenService.getUserIdFromToken();

    if (userId) {
      this.userProfileStateService.onDataUserEditProfile(userId);
    }

    this.userProfileStateService.onDataCountries();
    this.userProfileStateService.onDataSpecialties();

    this.editProfileForm = new FormGroup({});
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setInitialValues();
    }, 1000);
  }

  setInitialValues() {
    this.originalValues = this.editProfileForm.value;
    console.log('this.originalValues', this.originalValues);
  }

  saveData() {
    this.userProfileUpdateService.updateProfile(
      this.editProfileForm,
      this.originalValues,
      this.areasComponent
    );
  }
}
