import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './component/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgbModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    PasswordResetComponent,
    ForgetPasswordComponent,
    UpdateUserComponent
  ]
})
export class LoginModule { }
