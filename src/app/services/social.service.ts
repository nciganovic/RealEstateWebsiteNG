import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private _http:HttpClient) { }

  getSocial():Observable<any>
  {
    return this._http.get('/assets/data/social.json');
  }
}
