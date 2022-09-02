import { Property } from './../interface/property';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '../interface/filter';

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

  getProperties():Observable<any>
  {
    return this._http.get('/assets/data/properties.json');
  }

  getPropertiesRequest()
  {
    this.getProperties().subscribe
    (
      (Response:Property[]) => 
      {
        this._propertyItems = this._filteredPropertyItems = Response;

        this._uniqueTypes = this.getTypeUniqueValues(this._propertyItems);
        this._uniqueStatus = this.getStatusUniqueValues(this._propertyItems);
        this._uniqueLocations = this.getLocaitonUniqueValues(this._propertyItems);
        this._uniqueBedrooms = this.getBedroomsUniqueValues(this._propertyItems);      
      
        console.log(this._uniqueTypes);
        console.log(this._uniqueStatus);
        console.log(this._uniqueLocations);
        console.log(this._uniqueBedrooms);
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
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

    console.log(this._propertyItems);

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
    console.log(this._filteredPropertyItems);

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

    console.log(propTmp );
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

    console.log(propTmp);
    return propTmp;
  }

  searchProperties(search: string): Property[]
  {
    console.log(this._filteredPropertyItems);

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
