import {NgModule} from "@angular/core";
import {SharedModule} from '../shared/shared.module';
import { RouterModule } from '@angular/router';  
import { Notification} from "./notification"; 
import { NguiMessagePopupComponent } from '@ngui/popup';
import { NguiPopupComponent } from "@ngui/popup";
import { NguiPopupModule } from '@ngui/popup';

 
var routes = RouterModule.forChild([
    {path: '',component:Notification},
    // {path: ':id',component:Message,resolve: {maps: PusherResolver} },
]);

@NgModule({
    imports: [routes, SharedModule,  NguiPopupModule,],
    declarations: [Notification],
})

export class NotificationsModule { }