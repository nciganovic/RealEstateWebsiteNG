import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { Filter } from '../shared/interface/filter';
import { PropertyComponent } from './property/property.component';

@Component({
  selector: 'app-findproperty',
  templateUrl: './findproperty.component.html',
  styleUrls: ['./findproperty.component.css']
})
export class FindpropertyComponent implements OnInit {

  @ViewChild(PropertyComponent)
  private _propertyComponent: PropertyComponent;


  constructor(private propertyService: PropertiesService) { }

  ngOnInit(): void {

  }

  onFilterClicked(event: Filter)
  {
    console.log("filter clicked");
    this._propertyComponent.getPropertiesRequest(event, null);
  }

  onSearchClicked(event: string)
  {
    console.log("search clicked");
    this._propertyComponent.getPropertiesRequest(null, event);
  }
}
