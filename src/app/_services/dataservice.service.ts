import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { appConfig } from '../app.config';

import "rxjs/Rx"
@Injectable()
export class DataserviceService {


  


  constructor(protected http: HttpClient) { }
 




  public showTasks() {
    return this.http.get(appConfig.apiUrl+'/tasks')
    .map((response:Response) => response);
 
  }

  public showData() {
    return this.http.get('data')
    .map((response:Response) => response);
 
  }
}

