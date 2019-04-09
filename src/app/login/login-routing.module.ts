import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/core';
import { LoginComponent } from '@app/login/component/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: extract('Login') }},
  { path: 'password/reset', component: PasswordResetComponent },
  { path: 'password/forget', component: ForgetPasswordComponent },
  Shell.childRoutes([
    { path: 'update/user', component: UpdateUserComponent },
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule { }
