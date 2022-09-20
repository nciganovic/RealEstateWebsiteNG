import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/app/shared/constants/api';
import { serverPath } from 'src/app/shared/constants/server';
import { Social } from '../shared/interface/social';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<any>
  {
    return this._http.get<Social[]>(serverPath + api.social);
  }
}
