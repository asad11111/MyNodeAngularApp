
import { Component, Output, ElementRef, EventEmitter, Input, ViewChild, Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { NguiMessagePopupComponent } from '@ngui/popup';
import { NguiPopupComponent } from "@ngui/popup";
import * as $ from 'jquery';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { } from '@types/googlemaps';

@Component({
    selector   : 'notification',
    templateUrl: './notification.html'



})
@Injectable()
export class Notification {
    @ViewChild(NguiPopupComponent) popup: NguiPopupComponent;

   
   
    constructor(protected http: Http,private spinnerService: Ng4LoadingSpinnerService) {
      this.showTasks();
  
    }
  
  
  
    ngOnInit() {

        $( '#topheader .navbar-nav a' ).on( 'click', function () {
            $( '#topheader .navbar-nav' ).find( 'li.active' ).removeClass( 'active' );
            $( this ).parent( 'li' ).addClass( 'active' );
        });

       
     
  
    }

    ngAfterViewInit()
    {
      this.spinnerService.hide();
    }
  
 
  
    message: string;
  
    public task: any = {};
    public tasks: any = [];
   
    public updtask:any={};
    public name:any={};
    public data: any = {};
    public show: number = 0;
    public hide: number = 0;
    public hidden:any=[];
    public mapShowHide: number = 1;
    public review: any = [];
    public n:any=false;
    public rating: number=0; 
    public b: any = false;
  
    
    public submit() {
      this.spinnerService.show();
      this.b = false;
      let data={
         name: this.task.name,
         Ratings:this.rating
  
      }
      this.task=this.rating;
      this.http.post(`tasks`, data).subscribe((res) => {
      
        this.task = "";
        this.rating=0;
        this.data = res.json();
        this.show=0;
        this.b = true;
        this.spinnerService.hide();
       // this.spinnerService.hide();
        console.log(this.data);
      }, (re) => { });
  
    }
  
    changeChecked(t, e) {
      this.review[t] = e.checked;
      return true;
  }
  
  checkCheked(t) {
      if (this.review[t]) {
          if (this.review[t] == true)
          {
              return this.n=true;
          }
      } else
      {
          return this.n=false;
      }
  }
  
    ratings(r){
      this.rating =r;  
  }
  
    public updateTask(a, id) {
  
      if (a!=1)
      return 0;
      if (a == 1) {
        this.show = 1;
        this.updtask=id;
       }
    }
  
    showHideMap(a)
    {
      if(a==1)
      this.mapShowHide=0;
  
      if(a!=1)
      {
        this.mapShowHide=1;
      }
  
      return 0;
  
    }
  
    public hideTasks()
    {
      this.show=0;
    }
  
    public taskupd(id,n)
    {
      this.updtask=id;
      this.name=n;
    console.log(this.updtask,this.name);
  
  
    let name={
  
      name:this.name
  
    }
    this.http.put('tasks/'+this.updtask, name).subscribe((res) => {
      this.show=0;
    }, (res) => { }); 
  
     
    }
  
  
  
    public showTasks() {
      this.b = false;
      this.http.get(`tasks`).subscribe((res) => {
        this.tasks = res.json();
        this.b = true;
        this.show=1;
        console.log(this.tasks);
        return this.tasks;
      }, (res) => { });
    }
  
    public delTask(id) {
      this.b = false;
      {
        this.popup.open(NguiMessagePopupComponent, {
          title: 'My Title',
          message: 'Are You Sure',
          buttons: {
            OK: () => {
              this.message = "Ok button is pressed";
              this.http.delete('tasks/' + id).subscribe((res) => {
                this.showTasks();
              }, (res) => { });
              this.popup.close();
            },
            CANCEL: () => {
              this.message = "Cancel button is pressed";
              this.popup.close();
            }
          }
        });
      };
  
  
    }
  
    openPopup() {
      this.popup.open(NguiMessagePopupComponent, {
        title: 'My Title',
        message: 'My Message',
        buttons: {
          OK: () => {
            this.message = "Ok button is pressed";
  
            this.popup.close();
          },
          CANCEL: () => {
            this.message = "Cancel button is pressed";
            this.popup.close();
          }
        }
      });
    };
  
  
  
    /*  public id:any;
     public data:any={};
     public user:any={};
     public products:any={};
     public b:any=false;
    
     public show()
     {
       this.b=false;
       this.http.get(`/api/products/${this.id}`).subscribe((res)=>{
         this.data = res.json().data;
         this.b=true;
         console.log(this.data);
       }, (re) => { });
   
     }
   
     public store()
     {
       this.b=false;
       this.http.post(`/api/products`, this.products).subscribe((res)=>{
         this.products = res.json().data;
         this.b=true;
         console.log(this.data);
       }, (re) => { });
   
     }
   
     public register()
     {
       this.http.post('/api/register/',this.user).subscribe((res)=>{
     }, (res)=>{
   
     });
   }
    */
  
  
  
  
  
  
  }










