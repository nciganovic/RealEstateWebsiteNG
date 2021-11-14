import { Filter } from './../../interface/filter';
import { PropertyComponent } from './../property/property.component';
import { Component, OnInit } from '@angular/core';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  private _ddPriceStatus: boolean = false;
  private _ddRoomStatus: boolean = false;

  constructor(private _propertyService: PropertiesService) { }

  ngOnInit(): void {
  }

  public get ddPriceStatus()
  {
    return this._ddPriceStatus;
  }

  public get ddRoomStatus()
  {
    return this._ddRoomStatus;
  }

  public toggleDropdownPrice()
  {
    if(this._ddPriceStatus)
      this._ddPriceStatus = false;
    else
      this._ddPriceStatus = true;
  }

  public toggleDropdownRoom()
  {
    if(this._ddRoomStatus)
      this._ddRoomStatus = false;
    else
      this._ddRoomStatus = true;
  }

  public onFilter() {
    let filter: Filter = 
    { 
      status: <string>(<HTMLInputElement>document.getElementsByName("status")[0]).value, 
      type: <string>(<HTMLInputElement>document.getElementsByName("type")[0]).value, 
      location: <string>(<HTMLInputElement>document.getElementsByName("location")[0]).value, 
      orderBy: <string>(<HTMLInputElement>document.getElementsByName("orderby")[0]).value, 
      numberOfRooms: <string>(<HTMLInputElement>document.getElementsByName("bedrooms")[0]).value, 
      maxPrice: <string>(<HTMLInputElement>document.getElementById("max-price")).value, 
      minPrice: <string>(<HTMLInputElement>document.getElementById("min-price")).value, 
    };

    this._propertyService.PropertyItems = this._propertyService.filterProperties(filter);
  }

  public onSearch()
  {
    let search: string = <string>(<HTMLInputElement>document.getElementsByName("search")[0]).value.trim();
    this._propertyService.PropertyItems = this._propertyService.searchProperties(search);
  }
}
