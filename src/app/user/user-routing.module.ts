import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Shell } from '@app/shell/shell.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRolesComponent } from './user-roles/user-roles.component'

const routes: Routes = [
  Shell.childRoutes([
    { path: 'users/all', component: UserListComponent },
    { path: 'users/roles', component: UserRolesComponent },
    { path: 'user/:id/details', component: UserDetailsComponent }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
