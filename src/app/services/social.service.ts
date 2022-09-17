import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/app/constants/api';
import { serverPath } from 'src/app/constants/server';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<any>
  {
    return this._http.get(serverPath + api.social);
  }
}
