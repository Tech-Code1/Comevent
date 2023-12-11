import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
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
})
export class EditProfileComponent implements OnInit, AfterViewInit {
  private tokenService = inject(TokenService);
  private formBuilder = inject(NonNullableFormBuilder);
  public userProfileStateService = inject(UserProfileStateService);
  public validatorsService = inject(ValidatorsService);
  private userProfileUpdateService = inject(UserProfileUpdateService);
  editProfileForm!: FormGroup;
  originalValues!: IEditProfileFormData;
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

  ngAfterViewInit() {
    this.setInitialValues();
  }

  setInitialValues() {
    this.originalValues = this.editProfileForm.value;
  }

  saveData() {
    this.userProfileUpdateService.updateProfile(
      this.editProfileForm,
      this.originalValues,
      this.areasComponent
    );
  }
}
