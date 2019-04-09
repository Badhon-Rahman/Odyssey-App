import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { ContainerDetailsComponent } from './container-details/container-details.component';
import { ContainerListComponent } from './container-list/container-list.component';
import { ContainerTypeDetailsComponent } from './container-type-details/container-type-details.component';
import { ContainerTypeListComponent } from './container-type-list/container-type-list.component';
import { ContainerTypeSetupComponent } from './container-type-setup/container-type-setup.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'container/all', component: ContainerListComponent },
    { path: 'container/:id/details', component: ContainerDetailsComponent },
    { path: 'containertype/all', component: ContainerTypeListComponent },
    { path: 'containertype/setup', component: ContainerTypeSetupComponent },
    { path: 'container/:id/typeDetails', component: ContainerTypeDetailsComponent },
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
