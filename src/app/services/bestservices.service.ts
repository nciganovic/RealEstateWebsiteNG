import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BestservicesService {

  constructor(private _http:HttpClient) { }

  getBestServices():Observable<any>
  {
    return this._http.get('/assets/data/services.json');
  }
}
