import { Property, PropertyRecive } from '../shared/interface/property';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '../shared/interface/filter';
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

  private _filteredPropertyItems : Property[] = [];

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

  getPropertyItemById(id: number): Property
  {
    return this._propertyItems.filter(x => x.id === id)[0];
  }

  getPropertiesRequest()
  {
    this.getAll().subscribe
    (
      (Response:PropertyRecive[]) => 
      {
        let propertyRecive: PropertyRecive[] = Response

        for(let prop of propertyRecive)
          this.PropertyItems.push(this.mapProperties(prop))

        this._filteredPropertyItems = this.PropertyItems;
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

  public mapProperties(propRecive: PropertyRecive): Property
  {
    let street: Street = {
      name: propRecive.streetName,
      number: propRecive.streetNumber
    };

    let location: Location = {
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

  filterProperties(filter: Filter): Property[]
  { 
    let propTmp = this._filteredPropertyItems.map(item => Object.assign({}, item));

    if(filter.status !== "status")
    {
      let itemsToRemove:Property[] =  propTmp.filter(x => x.status == filter.status);  
      propTmp = propTmp.filter(x => itemsToRemove.indexOf(x) !== -1);
    }

    if(filter.type !== "type")
    {
      let itemsToRemove:Property[] = propTmp.filter(x => x.type == filter.type);  
      propTmp  = propTmp .filter(x => itemsToRemove.indexOf(x) !== -1);
    }

    if(filter.location !== "location")
    {
      let itemsToRemove:Property[] = propTmp .filter(x => x.location.city == filter.location); 
      propTmp  = propTmp .filter(x => itemsToRemove.indexOf(x) !== -1);
    } 

    if(filter.numberOfRooms !== "bedrooms")
    {
      let itemsToRemove:Property[] = propTmp .filter(x => x.rooms == Number(filter.numberOfRooms));
      propTmp  = propTmp .filter(x => itemsToRemove.indexOf(x) !== -1);
    }

    let itemsToRemove:Property[] = propTmp .filter(x => x.price > Number(filter.minPrice) 
                                                                && x.price < Number(filter.maxPrice));
    propTmp  = propTmp .filter(x => itemsToRemove.indexOf(x) !== -1);

    if(filter.orderBy !== "Order By:")
    {
      if(filter.orderBy == "Acsending price")
        propTmp .sort(((x, y) => x.price > y.price ? 1 : -1));
      else if(filter.orderBy == "Decsending price")
        propTmp .sort(((x, y) => x.price < y.price ? 1 : -1));
      else if(filter.orderBy == "Newest")
        propTmp .sort(((x, y) => x.date < y.date ? 1 : -1));
      else if(filter.orderBy == "Oldest")
        propTmp .sort(((x, y) => x.date > y.date ? 1 : -1));
    }
  
    return propTmp;
  }

  searchProperties(search: string): Property[]
  {
    let propTmp = this._filteredPropertyItems.map(item => Object.assign({}, item));
    let searchedItems =  propTmp.filter(x => (x.location.street.name.toLowerCase() + x.location.street.number).includes(search.toLowerCase()));  
    return searchedItems;
  }

  removeProperty(id: string): void
  {
    let property = this.PropertyItems.filter(x => x.id == Number(id))[0];
    let index = this.PropertyItems.indexOf(property) ;
    this.PropertyItems.splice(index, 1);
    this._filteredPropertyItems = this.PropertyItems;
  }
}
