import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../shared/interface/status';
import { serverPath } from 'src/app/shared/constants/server';
import { api } from 'src/app/shared/constants/api';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<any>
  {
    return this._http.get<Status[]>(serverPath + api.status);
  }
}
