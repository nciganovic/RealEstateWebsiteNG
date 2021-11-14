import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private _http:HttpClient) { }

  getPopularPlaces():Observable<any>
  {
    return this._http.get('/assets/data/place.json');
  }
}
