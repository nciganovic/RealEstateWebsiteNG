import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { serverPath } from 'src/app/shared/constants/server';
import { api } from 'src/app/shared/constants/api';
import { Menu } from '../shared/interface/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<any>
  {
    return this._http.get<Menu[]>(serverPath + api.menu);
  }
}
