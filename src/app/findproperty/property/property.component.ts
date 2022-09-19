import { Property, PropertyRecive } from '../../shared/interface/property';
import { PropertiesService } from './../../services/properties.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/shared/interface/filter';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  private _properties: Property[] = [];

  constructor(private _propertyService: PropertiesService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getPropertiesRequest();
  }

  public get Properties()
  {
    return this._properties;
  }

  getPropertiesRequest(filter: Filter | null = null, search: string | null = null)
  {
    this._propertyService.getAll().subscribe
    (
      (Response:PropertyRecive[]) => 
      {
        let propertyRecive: PropertyRecive[] = Response
        this._properties = [];
        for(let prop of propertyRecive)
          this._properties.push(this._propertyService.mapProperties(prop))

        if(filter)
          this.filterProperties(filter);
        if(search)
          this.searchProperties(search);
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

  filterProperties(filter: Filter)
  { 
    if(filter.status !== "Status")
    {
      let itemsToRemove:Property[] =  this._properties.filter(x => x.status == filter.status);  
      this._properties = this._properties.filter(x => itemsToRemove.indexOf(x) !== -1);
    }

    if(filter.type !== "Type")
    {
      let itemsToRemove:Property[] = this._properties.filter(x => x.type == filter.type);  
      this._properties  = this._properties .filter(x => itemsToRemove.indexOf(x) !== -1);
    }

    if(filter.location !== "Location")
    {
      let itemsToRemove:Property[] = this._properties .filter(x => x.location.city == filter.location); 
      this._properties  = this._properties .filter(x => itemsToRemove.indexOf(x) !== -1);
    } 

    if(filter.numberOfRooms !== "Bedrooms")
    {
      let itemsToRemove:Property[] = this._properties .filter(x => x.rooms == Number(filter.numberOfRooms));
      this._properties  = this._properties .filter(x => itemsToRemove.indexOf(x) !== -1);
    }

    let itemsToRemove:Property[] = this._properties .filter(x => x.price > Number(filter.minPrice) && x.price < Number(filter.maxPrice));
    this._properties  = this._properties .filter(x => itemsToRemove.indexOf(x) !== -1);

    if(filter.orderBy !== "Order By:")
    {
      if(filter.orderBy == "Acsending price")
        this._properties .sort(((x, y) => x.price > y.price ? 1 : -1));
      else if(filter.orderBy == "Decsending price")
        this._properties .sort(((x, y) => x.price < y.price ? 1 : -1));
      else if(filter.orderBy == "Newest")
        this._properties .sort(((x, y) => x.date < y.date ? 1 : -1));
      else if(filter.orderBy == "Oldest")
        this._properties .sort(((x, y) => x.date > y.date ? 1 : -1));
    }
  }

  searchProperties(search: string)
  {
    this._properties = this._properties.filter(x => (x.location.street.name.toLowerCase() + x.location.street.number).includes(search.toLowerCase())); 
  }
}
