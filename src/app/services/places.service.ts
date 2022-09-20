import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/app/shared/constants/api';
import { serverPath } from 'src/app/shared/constants/server';
import { Place } from '../shared/interface/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<any>
  {
    return this._http.get<Place[]>(serverPath + api.place);
  }
}
