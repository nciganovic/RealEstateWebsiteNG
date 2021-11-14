import { PropertiesService } from './../../services/properties.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private _propertyService: PropertiesService) { }

  ngOnInit(): void 
  {
    this._propertyService.getPropertiesRequest();
  }

  public get Statuses()
  {
    return this._propertyService.UniqueStatuses;
  }

  public get Locations()
  {
    return this._propertyService.UniqueLocations;
  }

  public get Types()
  {
    return this._propertyService.UniqueTypes;
  }

  public get Bedrooms()
  {
    return this._propertyService.UniqueBedrooms;
  }

}
