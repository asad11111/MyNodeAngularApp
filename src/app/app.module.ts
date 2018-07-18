import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from '@angular/http';
import { Ng2PaginationModule } from 'ng2-pagination'; //importing ng2-pagination
import { NguiPopupModule } from '@ngui/popup';
import { SharedModule } from './shared/shared.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PusherService } from './pusher.service';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { DynamicFormComponent } from './second/second.component';
import { ShellModule, Shell } from './shell/shell.module'; 
import { MessagesComponent } from './messages/messages.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule } from 'ng2-Charts';
import { ChartModule } from 'angular-highcharts';
import { googleMaps } from "./map";
import { MapsResolver } from "./google-maps-resolver";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { DataTableModule } from 'angular5-data-table';
import { DataTableDemo1Component } from './demo1/data-table-demo1';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { DataserviceService } from './_services/dataservice.service'
import { ReactiveFormsModule } from '@angular/forms';
import { Base64UploadComponent } from './base64-upload/base64-upload.component';
import { FormdataUploadComponent } from './formdata-upload/formdata-upload.component';
import * as $ from 'jquery';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { UmlComponent } from './umlapp/umlapp.component';

declare let require: any;


const rootRouterConfig: Routes = [
  { path: '',  component: FirstComponent, canActivate: [AuthGuard] , resolve: { maps: MapsResolver } },
  { path: 'login', component: LoginComponent },
  { path: 'uml', component: UmlComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'child', component: ChildComponent },
  {
    path: '', data: { title: 'Home' }, component: Shell, canActivate: [AuthGuard], children: [

      { path: 'notification', loadChildren: './notifications/notifications.module#NotificationsModule' },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'charts',
        component: ChartsComponent,
      },
      {
        path: 'demo1',
        component: DataTableDemo1Component,
      }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    UmlComponent,
    DynamicFormComponent,
    MessagesComponent,
    ChartsComponent,
    DataTableDemo1Component,
    AlertComponent,
    Base64UploadComponent,
    FormdataUploadComponent,
    LoginComponent,
    RegisterComponent,
    googleMaps,
    ChildComponent,
    ParentComponent,
    UmlComponent
  ],

  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    ChartsModule,
    ChartModule,
    ReactiveFormsModule,
    NguiPopupModule,
    DataTableModule,
    Ng2PaginationModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShellModule,
    SharedModule,
    RouterModule.forRoot(rootRouterConfig),

  ],

  providers: [
    PusherService, { provide: LocationStrategy, useClass: HashLocationStrategy }, MapsResolver, AuthGuard,
    AlertService,
    DataserviceService,
    AuthenticationService,
    UserService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider],

  bootstrap: [AppComponent],


})

export class AppModule { }
