import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragAndDropModule } from 'angular-draggable-droppable';
// import { NgSelectModule } from '@ng-select/ng-select';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { LayoutModule } from './layout/layout.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { AppConfig } from './app.config';
import { ErrorComponent } from './error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SetupModule } from './setup/setup.module';


const APP_PROVIDERS = [
  AppConfig
];

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    // NgSelectModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    DragAndDropModule,
    CoreModule,
    SharedModule,
    LayoutModule,
    DashboardModule,
    LoginModule,
    UserModule,
    SetupModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  providers: [
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
