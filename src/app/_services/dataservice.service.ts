import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


import "rxjs/Rx"
@Injectable()
export class DataserviceService {


  


  constructor(protected http: HttpClient) { }
 




  public showTasks() {
    return this.http.get('tasks')
    .map((response:Response) => response);
 
  }
}

