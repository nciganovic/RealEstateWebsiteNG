import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationToSend } from '../shared/interface/location';
import { serverPath } from 'src/app/constants/server';
import { api } from 'src/app/constants/api';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _http:HttpClient) { }

  add(data: LocationToSend):Observable<any>
  {
    return this._http.post<Location>(serverPath + api.location, data);
  }
}
