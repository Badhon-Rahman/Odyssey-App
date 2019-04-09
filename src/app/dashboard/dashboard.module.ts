import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoute } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { WidgetModule } from '../layout/widget/widget.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [ CommonModule, DashboardRoute, WidgetModule, TranslateModule ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule {
}
