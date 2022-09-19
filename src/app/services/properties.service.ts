import { Property, PropertyRecive, PropertyToSend } from '../shared/interface/property';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/app/constants/api';
import { serverPath } from 'src/app/constants/server';
import { Street } from '../shared/interface/street';
import { Location } from '../shared/interface/location';
import { Owner } from '../shared/interface/owner';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  private _propertyItems: Property[] = [];

  constructor(private _http: HttpClient) { }

  public get PropertyItems(): Property[]
  {
    return this._propertyItems;
  }

  public set PropertyItems(value: Property[])
  {
    this._propertyItems = value;
  }

  getAll():Observable<any>
  {
    return this._http.get<PropertyRecive[]>(serverPath + api.property);
  }

  getById(id: number):Observable<any> 
  {
    return this._http.get<PropertyRecive>(serverPath + api.property + "/" + id);
  }

  add(dataToSend: PropertyToSend):Observable<any> 
  {
    return this._http.post<PropertyRecive>(serverPath + api.property, dataToSend);
  }

  update(id: number, dataToSend: PropertyToSend):Observable<any> 
  {
    return this._http.patch<PropertyRecive>(serverPath + api.property + "/" + id, dataToSend);
  }

  remove(id: number):Observable<any> 
  {
    return this._http.delete<PropertyRecive>(serverPath + api.property + "/" + id);
  }

  public mapProperties(propRecive: PropertyRecive): Property
  {
    let street: Street = {
      name: propRecive.streetName,
      number: propRecive.streetNumber
    };

    let location: Location = {
      id: propRecive.locationId,
      street: street,
      city: propRecive.city,
      country: propRecive.country
    };

    let owner: Owner = {
      firstName: propRecive.firstName,
      lastName: propRecive.lastName,
      email: propRecive.email,
      phoneNumber: propRecive.phoneNumber
    };

    let propObj: Property = {
      id: propRecive.id,
      location: location,
      owner: owner,
      status: propRecive.status,
      price: propRecive.price,
      type: propRecive.type,
      rooms: propRecive.rooms,
      date: propRecive.date,
      img: propRecive.img
    };

    return propObj; 
  }
}
