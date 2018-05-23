import { Component, ViewChild } from '@angular/core';
import persons from './data-table-demo1-data';
import { DataTableResource } from 'angular5-data-table';
import { } from '@types/googlemaps';
import { googleMaps } from "../map";
import { Http, Response, RequestOptions } from '@angular/http';
import { NguiMessagePopupComponent } from '@ngui/popup';
import { NguiPopupComponent } from "@ngui/popup";
import { count } from 'rxjs/operators';
@Component({
    selector: 'app-data-table-demo-1',
    providers: [],
    templateUrl: './data-table-demo1.html',
    styleUrls: ['./data-table-demo1.css']
})
export class DataTableDemo1Component {
    @ViewChild(NguiPopupComponent) popup: NguiPopupComponent;
    public show: number = 0;
    message: string;
    public data: any = [
      
 
        {
          'name': 'Asad', 'email': 'Gideon9@yahoo.com', 'jobTitle': 'Global Mobility Orchestrator',
          'active': false, 'phoneNumber': '115-850-0969', 'date': '2014-12-20T00:48:40.276Z'
        },
        {
          'name': 'Saqib', 'email': 'Laney_Huels@hotmail.com', 'jobTitle': 'Senior Directives Supervisor',
          'active': false, 'phoneNumber': '632-654-3034', 'date': '2015-09-29T04:33:38.544Z'
        },
    ];
    public data1: any = {};
    ngOnInit(){
       
        this.showTasks();

       
       
     }
    public defaultMap: any = { lat: -41.282966, lng: 174.773254 };
    itemResource = new DataTableResource(this.data);
    
    items = [];
    itemCount = 0;
    limits = [5, 10, 20, 40, 80];
    public job:any={};
   
    public map_circle:any=true;
    constructor(protected http:Http) {
        this.itemResource.count().then(count => this.itemCount = count);
        
        
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
        
       
       return  this.http.get(`tasks`).subscribe((res) => {
          this.data1 = res.json();
          this.itemResource=new DataTableResource(this.data1);
          this.show = 1;
          console.log(this.data1 ,"data");
        
    
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
        alert('Double clicked: ' + rowEvent.row.item.name);
    }

    rowTooltip(item) {
      return item.jobTitle;
    }
}

