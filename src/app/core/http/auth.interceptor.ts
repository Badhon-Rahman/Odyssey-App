import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '@env/environment';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private auth: AuthenticationService) {}
 
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url.search(environment.serverUrl) != -1) {
        if(this.auth.isAuthenticated()) {
          request = request.clone({ setHeaders: { Authorization: this.auth.credentials.token } });
        }
      }
      return next.handle(request);
  }
}