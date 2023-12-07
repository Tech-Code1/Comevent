import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Swal } from '@utils';
import { take } from 'rxjs';
import {
  ICountries,
  ISimplifiedUserEditProfile,
  ISpecialties,
  IUserProfile,
} from '../..';
import { environment } from '../../../../environments/environment';
import { UserProfileApiService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class UserProfileStateService {
  userProfileService = inject(UserProfileApiService);
  router = inject(Router);

  BASE_API: string = environment.baseUrl;
  private _dataUserProfile = signal<IUserProfile>({});
  private _dataUserEditProfile = signal<ISimplifiedUserEditProfile>({
    avatar: '',
    username: '',
    email: '',
    description: '',
    socialNetworks: [{ link: '', platform: '' }],
    areaOfExpertise: [],
    areaOfInteres: [],
    firstName: '',
    lastName: '',
    bornDate: null,
    gender: '',
    age: null,
    specialty: '',
    country: '',
  });
  private _dataCountries = signal<ICountries[]>([{ id: 0, name: '' }]);
  private _dataSpecialties = signal<ISpecialties[]>([{ id: 0, name: '' }]);
  private _loading = signal<boolean>(false);
  public dataCountries = computed(() => this._dataCountries());
  public dataSpecialties = computed(() => this._dataSpecialties());
  public dataUserEditProfile = computed(() => this._dataUserEditProfile());
  public dataUserProfile = computed(() => this._dataUserProfile());
  public loadingProfile = computed(() => this._loading());

  onDataUserProfile(id: string): void {
    this._loading.set(true);
    console.log('loading', this._loading());
    console.log('entro a onDataUserProfile', id);

    this.userProfileService
      .dataUser(id)
      .pipe(take(1))
      .subscribe({
        next: ({ data }) => {
          console.log('data', data);

          this._dataUserProfile.set(data as IUserProfile);
          this._loading.set(false);

          console.log('loading', this._loading());
        },
        error: ({ response }) => {
          Swal.error(response.message);
          this._loading.set(false);
        },
      });
  }

  onDataUserEditProfile(id: string): void {
    this._loading.set(true);

    this.userProfileService
      .dataUserEditProfile(id)
      .pipe(take(1))
      .subscribe({
        next: ({ data }) => {
          console.log('data', data);

          this._dataUserEditProfile.set(data as ISimplifiedUserEditProfile);
          this._loading.set(false);
        },
        error: ({ response }) => {
          Swal.error(response.message);
          this._loading.set(false);
        },
      });
  }

  onDataCountries(): void {
    this._loading.set(true);

    this.userProfileService
      .allCountries()
      .pipe(take(1))
      .subscribe({
        next: ({ data }) => {
          this._dataCountries.set(data as ICountries[]);
          this._loading.set(false);
        },
        error: ({ response }) => {
          Swal.error(response.message);
          this._loading.set(false);
        },
      });
  }

  onDataSpecialties(): void {
    this._loading.set(true);

    this.userProfileService
      .allSpecialties()
      .pipe(take(1))
      .subscribe({
        next: ({ data }) => {
          this._dataSpecialties.set(data as ISpecialties[]);
          this._loading.set(false);
        },
        error: ({ response }) => {
          Swal.error(response.message);
          this._loading.set(false);
        },
      });
  }
}
