import { Component, ViewChild } from '@angular/core';
import persons from './data-table-demo1-data';
import { DataTableResource } from 'angular5-data-table';
import { } from '@types/googlemaps';
import { googleMaps } from "../map";
import { Http,Headers, Response, RequestOptions } from '@angular/http';
import { NguiMessagePopupComponent } from '@ngui/popup';
import { NguiPopupComponent } from "@ngui/popup";
import { count } from 'rxjs/operators';
import {Router} from "@angular/router";
import { FirstComponent } from '../first/first.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-data-table-demo-1',
  providers: [],
  templateUrl: './data-table-demo1.html',
  styleUrls: ['./data-table-demo1.css']
})
export class DataTableDemo1Component {
  @ViewChild(NguiPopupComponent) popup: NguiPopupComponent;
  @ViewChild(FirstComponent) viewChild: FirstComponent;
  public show: number = 0;

  message: string;

  data_arr: any;
  public data: any = [


    
  ];
  public data1: any = {};
  ngOnInit() {

    this.showTasks();
    console.log(this.data1,"data1");



  }
  public defaultMap: any = { lat: -41.282966, lng: 174.773254 };
  itemResource = new DataTableResource(this.data1);

  items = [];
  itemCount = 0;
  limits = [5, 10, 20, 40, 80];
  public job: any = {};

  public map_circle: any = true;
  constructor(protected http: HttpClient, private router:Router) {
    this.itemResource.count().then(count => this.itemCount = count);
    console.log(this.data1,"data1");

  }
  ngAfterViewInit() {
console.log(this.data1,"data1");
  }


  public delTask(id) {
    console.log(id);

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





  public showTasks() {

    return this.http.get(`tasks`).subscribe((res) => {
      this.data1 = res;

      this.itemResource = new DataTableResource(this.data1);
      this.itemResource.count().then(count => this.itemCount = count);
      this.show = 1;
      
      console.log(this.data1, "data");
      this.router.navigate(['/','demo1']);
      


    }, (res) => { });


  }






  googleLat(el) {
    this.job.google_lat = el.lat();
    this.job.google_long = el.lng();
  }

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  // special properties:
  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowDoubleClick(rowEvent) {
  // alert('Double clicked: ' + rowEvent.row.item.name);
    //this.delTask(rowEvent.row.item._id) ;
  }

  rowTooltip(item) {
    return item.name;
  }
}

