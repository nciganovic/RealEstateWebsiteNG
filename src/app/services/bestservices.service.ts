import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/app/shared/constants/api';
import { serverPath } from 'src/app/shared/constants/server';
import { Service } from '../shared/interface/service';

@Injectable({
  providedIn: 'root'
})
export class BestservicesService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<any>
  {
    return this._http.get<Service[]>(serverPath + api.services);
  }
}
