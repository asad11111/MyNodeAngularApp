import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import { HttpModule } from '@angular/http';
import {Ng2PaginationModule} from 'ng2-pagination'; //importing ng2-pagination
import { NguiPopupModule } from '@ngui/popup';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PusherService } from './pusher.service';

import { AppComponent } from './app.component';

import {DataTableModule} from "angular2-datatable";
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';



import {ShellModule, Shell} from './shell/shell.module';
import { MessagesComponent } from './messages/messages.component';
import { ChartsComponent } from './charts/charts.component';
import {ChartsModule} from 'ng2-Charts';
import { ChartModule } from 'angular-highcharts';




declare let require:any;


const rootRouterConfig: Routes = [
  {path: '', component: FirstComponent}, 
   
  { path: '', data:{title: 'Home'}, component: Shell  ,children:[      
    {path: 'notification', loadChildren: './notifications/notifications.module#NotificationsModule'}, 
    {
      path: 'messages',
      component: MessagesComponent,
    },
    {
      path: 'charts',
      component: ChartsComponent,
    }
     
  ] },
];




@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    MessagesComponent,
    ChartsComponent
  ],
  
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    ChartModule,
    NguiPopupModule,
    Ng2PaginationModule,
    DataTableModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ShellModule, 
    SharedModule,
    RouterModule.forRoot(rootRouterConfig),
  

   

    SharedModule,
    
  

   
 
  ],

  providers: [   PusherService
   ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
