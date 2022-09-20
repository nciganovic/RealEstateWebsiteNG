import { Filter } from '../../shared/interface/filter';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  private _ddPriceStatus: boolean = false;
  @Output() filterClicked = new EventEmitter();
  @Output() searchClicked = new EventEmitter();

  constructor(private _propertyService: PropertiesService) { }

  ngOnInit(): void {
  }

  public get ddPriceStatus()
  {
    return this._ddPriceStatus;
  }

  public toggleDropdownPrice()
  {
    if(this._ddPriceStatus)
      this._ddPriceStatus = false;
    else
      this._ddPriceStatus = true;
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

    this.filterClicked.emit(filter);
  }

  public onSearch()
  {
    let search: string = <string>(<HTMLInputElement>document.getElementsByName("search")[0]).value.trim();
    this.searchClicked.emit(search);
  }
}
