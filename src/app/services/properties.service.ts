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

  private _uniqueTypes: string[] = [];
  private _uniqueBedrooms: number[] = [];
  private _uniqueStatus: string[] = [];
  private _uniqueLocations: string[] = [];

  constructor(private _http: HttpClient) { }

  public get PropertyItems(): Property[]
  {
    return this._propertyItems;
  }

  public set PropertyItems(value: Property[])
  {
    this._propertyItems = value;
  }

  public get UniqueTypes()
  {
    return this._uniqueTypes;
  }

  public get UniqueStatuses()
  {
    return this._uniqueStatus;
  }

  public get UniqueLocations()
  {
    return this._uniqueLocations;
  }

  public get UniqueBedrooms()
  {
    return this._uniqueBedrooms;
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

        this._uniqueTypes = this.getTypeUniqueValues(this._propertyItems);
        this._uniqueStatus = this.getStatusUniqueValues(this._propertyItems);
        this._uniqueLocations = this.getLocaitonUniqueValues(this._propertyItems);
        this._uniqueBedrooms = this.getBedroomsUniqueValues(this._propertyItems);     
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

  getTypeUniqueValues(propertyItems: Property[])
  {
    let uniqueTypes: string[] = [];
    propertyItems.forEach(element => {
      if(!uniqueTypes.includes(element.type))
      {
        uniqueTypes.push(element.type);
      }
    });

    return uniqueTypes;
  }

  getBedroomsUniqueValues(propertyItems: Property[])
  {
    let uniqueBedrooms: number[] = [];
    propertyItems.forEach(element => {
      if(!uniqueBedrooms.includes(Number(element.rooms)))
      {
        uniqueBedrooms.push(Number(element.rooms));
      }
    });

    uniqueBedrooms.sort((x, y) => x > y ? 1 : -1);
    return uniqueBedrooms;
  }

  getLocaitonUniqueValues(propertyItems: Property[])
  {
    let uniqueLocations: string[] = [];
    propertyItems.forEach(element => {
      if(!uniqueLocations.includes(element.location.city))
      {
        uniqueLocations.push(element.location.city);
      }
    });

    return uniqueLocations;
  }

  getStatusUniqueValues(propertyItems: Property[])
  {
    let uniqueStatus: string[] = [];
    propertyItems.forEach(element => {
      if(!uniqueStatus.includes(element.status))
      {
        uniqueStatus.push(element.status);
      }
    });

    return uniqueStatus;
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

    if(!localStorage.getItem("removedItemIds"))
    {
      let initalRemoveArr:number[] = [];
      initalRemoveArr.push(Number(id));
      localStorage.setItem("removedItemIds", JSON.stringify(initalRemoveArr));
    }
    else
    {
      let removedIds = JSON.parse(localStorage.getItem("removedItemIds") ?? "") as number[]; 
      removedIds.push(Number(id));
      localStorage.setItem("removedItemIds", JSON.stringify(removedIds));
    }
  }
}
