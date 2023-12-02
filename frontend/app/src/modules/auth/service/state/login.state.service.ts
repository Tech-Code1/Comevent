import { Injectable, computed, inject, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Swal } from '@utils';
import { take } from 'rxjs';
import { RegisterUtilsService } from '..';
import { environment } from '../../../../environments/environment';
import {
  AuthStatus,
  ILogin,
  ILoginData,
  IRevalidateTokenResponse,
} from '../../types';
import { LoginApiService, RegisterApiService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class LoginStateService {
  loginService = inject(LoginApiService);
  private registerApi = inject(RegisterApiService);
  private registerUtils = inject(RegisterUtilsService);
  router = inject(Router);
  private _currentUser = signal<ILogin | object>({});
  private _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);
  BASE_API: string = environment.baseUrl;
  private authInitializedResolve: Function | null = null;
  private authInitialized = new Promise<void>((resolve) => {
    this.authInitializedResolve = resolve;
  });

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private setAuthtication(
    data: (object | IRevalidateTokenResponse) | (object | ILogin)
  ): boolean {
    this._currentUser.set(data);
    this._authStatus.set(AuthStatus.AUTHENTICATED);

    if ('token' in data) {
      localStorage.setItem('token', data.token);
    }

    return true;
  }

  onSubmit(form: AbstractControl<ILoginData>): void {
    const { email, password } = form.value;
    this.loginService
      .loginUser({ email, password })
      .pipe(take(1))
      .subscribe({
        next: ({ data, response }) => {
          this.setAuthtication(data);

          this.router.navigateByUrl('/user/profile');
          Swal.success(response.message, true);
        },
        error: ({ response }) => {
          Swal.error(response.message);
        },
      });
  }

  public initialize(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Configurar estado inicial como 'CHECKING' mientras se verifica el token
      this._authStatus.set(AuthStatus.CHECKING);

      // Verificación asincrónica del token
      this.loginService.checkAuthStatus().subscribe({
        next: ({ data }) => {
          this.setAuthtication(data);
          this.authInitializedResolve?.();
        },
        error: ({ response }) => {
          if (response?.message === 'Token not found') {
            this.logout();
          } else {
            this._authStatus.set(AuthStatus.NOT_AUTHENTICATED);
          }

          this.authInitializedResolve?.();
        },
      });
    } else {
      this._authStatus.set(AuthStatus.NOT_AUTHENTICATED);
      this.authInitializedResolve?.();
    }
  }

  public waitForInitialization(): Promise<void> {
    return this.authInitialized;
  }

  loginProvider(code: string, id: string, provider: string): void {
    this.registerApi.claimToken(code, id, provider).subscribe({
      next: ({ data }) => {
        this.setAuthtication(data);
        this._authStatus.set(AuthStatus.AUTHENTICATED);
        // Redirigir al perfil del usuario o a otra página según sea necesario
        this.router.navigateByUrl('/user/profile');
        this.registerUtils.isLoadingProviderGoogle.set(false);
        this.registerUtils.isLoadingProviderGithub.set(false);
      },
      error: ({ response }) => {
        console.error('Error during claimToken:', response?.message);
        this.router.navigateByUrl('/auth/login');
      },
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this._currentUser.set({});
    this._authStatus.set(AuthStatus.NOT_AUTHENTICATED);
    this.router.navigateByUrl('/auth/login');
  }
}
