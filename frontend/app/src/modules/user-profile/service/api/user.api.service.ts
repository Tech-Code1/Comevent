import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { BaseResponse } from '../../../../common';
import { environment } from '../../../../environments/environment';
import {
  DataCountriesAdapter,
  DataSpecialtiesAdapter,
  DataUpdateProfileAdapter,
  DataUserAdapter,
  DataUserEditProfileAdapter,
} from '../../adapters';

import {
  ICountries,
  ISimplifiedUserEditProfile,
  ISpecialties,
  IUpdateProfile,
  IUserProfile,
} from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserProfileApiService {
  private http = inject(HttpClient);
  router = inject(Router);
  BASE_API: string = environment.baseUrl;

  dataUser(id: string): Observable<BaseResponse<IUserProfile | undefined>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<BaseResponse<IUserProfile | undefined>>(
        `${this.BASE_API}/user/profile/${id}`,
        {
          headers,
        }
      )
      .pipe(
        switchMap((res) => of(DataUserAdapter(res))),
        catchError(({ error }) => {
          throw error;
        })
      );
  }

  dataUserEditProfile(
    id: string
  ): Observable<BaseResponse<ISimplifiedUserEditProfile | undefined>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<BaseResponse<ISimplifiedUserEditProfile | undefined>>(
        `${this.BASE_API}/user/edit-profile/${id}`,
        {
          headers,
        }
      )
      .pipe(
        switchMap((res) => of(DataUserEditProfileAdapter(res))),
        catchError(({ error }) => {
          throw error;
        })
      );
  }

  allCountries(): Observable<BaseResponse<ICountries[] | undefined>> {
    return this.http
      .get<BaseResponse<ICountries[] | undefined>>(`${this.BASE_API}/countries`)
      .pipe(
        switchMap((res) => of(DataCountriesAdapter(res))),
        catchError(({ error }) => {
          throw error;
        })
      );
  }

  allSpecialties(): Observable<BaseResponse<ISpecialties[] | undefined>> {
    return this.http
      .get<BaseResponse<ISpecialties[] | undefined>>(
        `${this.BASE_API}/specialties`
      )
      .pipe(
        switchMap((res) => of(DataSpecialtiesAdapter(res))),
        catchError(({ error }) => {
          throw error;
        })
      );
  }

  editUserProfile(
    updateProfile: Partial<IUpdateProfile>
  ): Observable<BaseResponse<Partial<IUpdateProfile> | undefined>> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('Token not found'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .patch<BaseResponse<Partial<IUpdateProfile> | undefined>>(
        `${this.BASE_API}/edit-profile`,
        updateProfile,
        { headers }
      )
      .pipe(
        switchMap((res) => of(DataUpdateProfileAdapter(res))),
        catchError(({ error }) => {
          throw error;
        })
      );
  }
}
