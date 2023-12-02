import { Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthStatus, LoginStateService } from './modules/auth';
import { supportLanguages } from './utils';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  title = 'Comevent';

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(supportLanguages);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

    /* const browserlang = this.translateService.getBrowserLang();
	 this.translateService.use(browserlang); */
  }

  private authService = inject(LoginStateService);
  private router = inject(Router);

  ngOnInit() {
    this.authService.initialize();
  }

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.CHECKING) {
      return false;
    }

    return true;
  });
}
