import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverPath } from 'src/app/shared/constants/server';
import { api } from 'src/app/shared/constants/api';
import { Type } from '../shared/interface/type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<any>
  {
    return this._http.get<Type[]>(serverPath + api.type);
  }
}
