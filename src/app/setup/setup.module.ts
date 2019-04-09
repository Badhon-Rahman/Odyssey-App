import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragAndDropModule } from 'angular-draggable-droppable';

import { SetupRoutingModule } from './setup-routing.module';
import { ContainerListComponent } from './container-list/container-list.component';
import { ContainerDetailsComponent } from './container-details/container-details.component';
import { ContainerTypeSetupComponent } from './container-type-setup/container-type-setup.component';
import { ContainerTypeListComponent } from './container-type-list/container-type-list.component';
import { ContainerTypeDetailsComponent } from './container-type-details/container-type-details.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgSelectModule,
    SetupRoutingModule,
    DragAndDropModule
  ],
  declarations: [ContainerListComponent, ContainerDetailsComponent, ContainerTypeSetupComponent, ContainerTypeListComponent, ContainerTypeDetailsComponent]
})
export class SetupModule { }
