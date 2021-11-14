import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _http:HttpClient) { }

  getMenu():Observable<any>
  {
    return this._http.get('/assets/data/menu.json');
  }
}
