import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http,Response} from '@angular/http';

import { appConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private _http:Http) { }

    public data:any=[];
    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + '/users');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/users/' + _id);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/users/register', user);
    }

    update(user: User) {
        return this.http.put(appConfig.apiUrl + '/users/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/users/' + _id);
    }

    showtasks()
    {
        return this.http.get('tasks')
.map((response:Response) => response);
    }
}