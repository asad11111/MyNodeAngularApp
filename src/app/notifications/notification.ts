import * as $ from 'jquery';
import { Component, Output, ElementRef, EventEmitter, Input, ViewChild, Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { NguiMessagePopupComponent } from '@ngui/popup';
import { NguiPopupComponent } from "@ngui/popup";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AlertService, AuthenticationService } from '../_services/index';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from '../_models/index';
import { appConfig } from '../app.config';

import 'rxjs/add/operator/map';
import { } from '@types/googlemaps';


@Component({
  selector: 'notification',
  templateUrl: './notification.html'



})
@Injectable()
export class Notification {

  message: string;

  public task: any = {};
  public tasks: any = [];
  public show: number = 0;
  public updtask: any = {};
  public name: any = {};
  public data: any = {};
  public hide: number = 0;
  public hidden: any = [];
  public mapShowHide: number = 1;
  public review: any = [];
  public n: any = false;
  public rating: number = 0;
  public b: any = false;
  users: User[] = [];
  currentUser: User;

  public err: any = {};
  @ViewChild(NguiPopupComponent) popup: NguiPopupComponent;


  constructor(protected http: HttpClient, private spinnerService: Ng4LoadingSpinnerService, private alertService: AlertService) {
    this.showTasks();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser.username, "current user");



  }



  ngOnInit() {


    $('#topheader .navbar-nav a').on('click', function () {
      $('#topheader .navbar-nav').find('li.active').removeClass('active');
      $(this).parent('li').addClass('active');
    });

  }





  ngAfterViewInit() {
    this.spinnerService.hide();
  }


  public isActive: any = false;


  public submit() {
    this.spinnerService.show();
    this.b = false;
    let data = {
      name: this.task.name,
      Ratings: this.rating,
      Status: this.task.status

    }
    this.task = this.rating;
    // console.log(data, "asdada");
    this.http.post(`tasks`, data).subscribe((res) => {

      this.data = res;

      if (this.data.message) {
        this.err = "Duplicate name. plz try again";
        console.log(this.err, "Validation error");
        this.alertService.error(this.err);
        this.spinnerService.hide();
        return false;
      }
      if (this.data.errors) {
        console.log("There are errors", this.data.message);
        this.spinnerService.hide();
        return false;
      }

      this.alertService.success('Task created succesfully', true);

      this.task = "";
      this.rating = 0;

      this.show = 0;
      this.b = true;


      this.spinnerService.hide();
      console.log(this.data);
      this.showTasks();
    },
      (res) => {
        this.err = res.errors;
        console.log(this.err);
      });

  }


  months = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"];

  changemonths(event) {
    // alert("Changed month from the Dropdown");
    // console.log(event);
    console.log(event.target.value + " Clicked!");
    let a = event.target.value;
    console.log(a, "latest");
  }

  myClickFunction(e)
  {
    console.log(e.target.value + " Clicked!");
  }
  public statuses: any = ['pending', 'ongoing', 'created'];



  changeChecked(t, e) {
    this.review[t] = e.checked;
    return true;
  }

  checkCheked(t) {
    if (this.review[t]) {
      if (this.review[t] == true) {
        return this.n = true;
      }
    } else {
      return this.n = false;
    }
  }

  ratings(r) {
    this.rating = r;
  }

  public updateTask(a, id) {

    if (a != 1)
      return 0;
    if (a == 1) {
      this.show = 1;
      this.updtask = id;
    }
  }

  showHideMap(a) {
    if (a == 1)
      this.mapShowHide = 0;

    if (a != 1) {
      this.mapShowHide = 1;
    }

    return 0;

  }

  public hideTasks() {
    this.show = 0;
  }

  public taskupd(id, n) {
    this.updtask = id;
    this.name = n;
    console.log(this.updtask, this.name);


    let name = {

      name: this.name

    }
    this.http.put('/tasks/' + this.updtask, name).subscribe((res) => {
      this.show = 0;
    }, (res) => { });


  }




  // public showTasks() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjBiZGU4MTAxZjMzYzJjYmNiMDUxOWQiLCJpYXQiOjE1Mjc1MDQ1ODh9.4En8R_vDQcHR5VHTXyQk5ltkm4oPcClpsyawBlEQv50');
  //   let options = new RequestOptions({ headers: headers });
  //   let baseURL = "tasks";
  //   return this.http.get(baseURL , options)
  //     .map(res => res.json());
  // }

  public showTasks() {
    this.http.get(appConfig.apiUrl + '/tasks')
      .subscribe((response) => {
        this.tasks = response;
        this.show = 1;
      }, (response) => { err => console.log(err) });
  }



  // public showTasks() {
  //   this.b = false;
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjBiZGU4MTAxZjMzYzJjYmNiMDUxOWQiLCJpYXQiOjE1Mjc1MDQ1ODh9.4En8R_vDQcHR5VHTXyQk5ltkm4oPcClpsyawBlEQv50');
  //   let options = new RequestOptions({ headers: headers });
  //   this.http.get(`tasks`, options).subscribe((res) => {
  //     this.tasks = res.json();
  //     this.b = true;
  //     this.show = 1;
  //     console.log(this.tasks);
  //     return this.tasks;
  //   }, (res) => { });
  // }

  public msg: any = " you want to delete "
  public delTask(id) {
    this.b = false;
    {
      this.popup.open(NguiMessagePopupComponent, {
        title: 'My Title',
        message: `Are You Sure ${this.msg}`,
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










