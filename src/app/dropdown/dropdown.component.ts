import { PropertiesService } from './../services/properties.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  
  private _orderByList:string[] = ["Order by: ", "Acsending price", "Decsending price", "Newest", "Oldest"];
  
  constructor(private _propertyService: PropertiesService) 
  { 

  }

  @Input() public type: string = ""; 
  
  @Input() public ddClass?: string = ""; 


  ngOnInit(): void {
    //this._propertyService.getPropertiesRequest();

    if(this.type)
      this.getDataBasedOnType(this.type)
  }

  public get DropDownItems()
  {
    return this.getDataBasedOnType(this.type);
  }

  getDataBasedOnType(type: string)
  {
    let dropDownItems;

    if(type === "status")
    {;
      dropDownItems = this._propertyService.UniqueStatuses;
      if(dropDownItems.indexOf(type) === -1)
        dropDownItems.unshift(type);

    }
    else if(type === "type")
    {
      dropDownItems = this._propertyService.UniqueTypes;
      if(dropDownItems.indexOf(type) === -1)
        dropDownItems.unshift(type);
    }
    else if(type === "location")
    {
      dropDownItems = this._propertyService.UniqueLocations;
      if(dropDownItems.indexOf(type) === -1)
        dropDownItems.unshift(type);
    }
    else if(type === "bedrooms")
    {
      dropDownItems = this._propertyService.UniqueBedrooms.map(String);
      if(dropDownItems.indexOf(type) === -1)
        dropDownItems.unshift(type);
    }
    else if(type === "orderby")
    {
      dropDownItems = this._orderByList;
    }

    return dropDownItems;
  }
}
