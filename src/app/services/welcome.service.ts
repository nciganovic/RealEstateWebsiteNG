import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/app/shared/constants/api';
import { serverPath } from 'src/app/shared/constants/server';
import { Welcome } from '../shared/interface/welcome';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private _http: HttpClient) { }

  getAll():Observable<any>
  {
    return this._http.get<Welcome[]>(serverPath + api.welcome);
  }
}
