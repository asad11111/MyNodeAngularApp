import { Component, OnInit, ViewChild,ViewContainerRef,ElementRef } from '@angular/core';
import {Router} from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { } from '@types/googlemaps';
import { googleMaps } from "../map";
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {DataserviceService} from '../_services/dataservice.service'


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {


  
  @ViewChild('gmap') gmapElement: any;
  @ViewChild('googlemapaddress') public input: ElementRef;
  map: google.maps.Map;
  public defaultMap: any = { lat: -41.282966, lng: 174.773254 };
  isTracking = false;
  public circle;
  public map_circle:any=true;
  currentLat: any;
  currentLong: any;
  public job:any={};
  currentUser: User;
  users: User[] = [];
  tasks:any=[];

  marker: google.maps.Marker;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private router:Router,private userService: UserService, private mydata:DataserviceService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
 }

  ngOnInit() {
   
   this.showTasks();
   this.loadAllUsers();
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  
  }


 

showTasks()
{
  this.tasks= this.mydata.showTasks() .subscribe((response) => {
    this.tasks=response;
    console.log(this.tasks, "On page load");
    
   }, (response) => { err => console.log(err)} );
 
}


deleteUser(_id: string) {
    this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
}

private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
   // console.log(this.users);
}


  googleLat(el) {
    this.job.google_lat = el.lat();
    this.job.google_long = el.lng();
}


  findMe() {
    this.spinnerService.show();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);

       // this.placeCircle() ;
        this.isTracking=false;
        
       this.spinnerService.hide();

      });
      
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    
  }



  placeCircle() {
    this.circle = new google.maps.Circle({
        strokeColor: '#2196f3',
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: '#2196f3',
        fillOpacity: 0.35,
        map: this.map,
        center:new google.maps.LatLng(this.currentLat, this.currentLong),
        radius: 500
    });

}

routeToNotifications()
{
  this.spinnerService.show();
  this.router.navigate(['/','notification']);
}
  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'You are here!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }



  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

}
