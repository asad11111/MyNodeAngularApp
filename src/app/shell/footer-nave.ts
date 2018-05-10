import {Component} from '@angular/core';

import { Router } from "@angular/router";


@Component({
    selector   : 'footer-nave',
    templateUrl: './footer-nave.html',
})
export class FooterNave {

    public footer:any=false;
    public userType:any=0;
    public dropdown:any=false;

    constructor(

        public router: Router,
    ){
        this.dropdown = false;
    }
    ngOnInit(){
        
        
    }
    ngAfterViewInit(){
      //  $('#side-menu').metisMenu();        
    }

   
}
