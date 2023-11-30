import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { BaseResponse } from '../../../../common';
import { environment } from '../../../../environments/environment';
import { DataUserAdapter, DataUserEditProfileAdapter } from '../../adapters';

import { ISimplifiedUserEditProfile, IUserProfile } from '../../types';

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
}
