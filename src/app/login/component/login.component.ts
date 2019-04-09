import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, LoginContext } from '@app/core';

const log = new Logger('Login');
declare let Messenger: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, LoginContext {

  version: string = environment.version;
  errorMsg: string = "Username or password is incorrect!";
  isLoading = false;
  username: string;
  password: string;
  remember: boolean = false;

  constructor(private router: Router,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
    // this.createForm();
  }

  ngOnInit() {
    this.authenticationService.logout();
    Messenger.options = {
      extraClasses: 'messenger-fixed messenger-on-top',
      theme: 'air'
    }
  }

  login() {
    this.isLoading = true;
    this.authenticationService.login({
      username: this.username,
      password: this.password,
      remember: this.remember
    })
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(username => {
        log.debug(`${username} successfully logged in`);
        this.router.navigate(['/'], { replaceUrl: true });
      }, error => {
        log.debug(`Login error: ${error}`);
        Messenger().post({
          message: this.errorMsg,
          type: 'error',
          showCloseButton: true
        })
        
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

}
