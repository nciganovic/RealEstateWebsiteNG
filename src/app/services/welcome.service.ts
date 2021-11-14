import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private _http: HttpClient) { }

  getTexts():Observable<any>
  {
    return this._http.get("/assets/data/welcome.json");
  }
}
