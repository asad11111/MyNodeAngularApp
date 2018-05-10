import { Component } from '@angular/core';

import { Http } from "@angular/http";
import { Router } from "@angular/router";


@Component({
    selector: 'top-nav',
    templateUrl: './topnav.html',
})
export class TopNav {


    constructor(
    
        public http: Http,
        public router: Router        
    ) {
           
    }
    ngOnInit() {
       
     }


    
}