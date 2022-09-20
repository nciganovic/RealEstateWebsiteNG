import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../shared/interface/city';
import { serverPath } from 'src/app/shared/constants/server';
import { api } from 'src/app/shared/constants/api';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<any>
  {
    return this._http.get<City[]>(serverPath + api.city);
  }
}
