import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {HttpModule, RequestOptions} from "@angular/http";
import { CommonModule }        from '@angular/common';



import {RatingStars} from "./rating";


@NgModule({
    declarations: [
       
        RatingStars
        // Panel, ImgCrop,InputImg, ImgCropModal,Aside,Box,
    ],
    imports: [
        HttpModule,
        FormsModule, CommonModule,
         RouterModule
    ],
    exports: [
        RouterModule, HttpModule,
        FormsModule, CommonModule,
        RatingStars
        // Panel, InputImg,ImgCrop,ImgCropModal, Aside,Box,
    ],
    providers: [
        
    ]

})
export class SharedModule {


}