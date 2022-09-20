import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from 'src/app/shared/constants/api';
import { serverPath } from 'src/app/shared/constants/server';
import { Owner } from '../shared/interface/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<any>
  {
    return this._http.get<Owner[]>(serverPath + api.owner);
  }
}
