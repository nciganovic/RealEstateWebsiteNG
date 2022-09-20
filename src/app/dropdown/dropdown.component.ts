import { PropertiesService } from './../services/properties.service';
import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from '../services/status.service';
import { TypeService } from '../services/type.service';
import { CityService } from '../services/city.service';
import { Status } from '../shared/interface/status';
import { City } from '../shared/interface/city';
import { Type } from '../shared/interface/type';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  
  private _orderByList:string[] = ["Order by: ", "Acsending price", "Decsending price", "Newest", "Oldest"];

  private _dropDownItems: string[] = [];

  private readonly _maxRoomsCount: number = 10; 

  constructor(private _propertyService: PropertiesService,
    private _statusService: StatusService,
    private _typeService: TypeService,
    private _cityService: CityService) 
  { 
  }

  @Input() public type: string = ""; 
  
  @Input() public ddClass?: string = ""; 


  ngOnInit(): void {
    this.getDataBasedOnType(this.type)
  }

  public get DropDownItems()
  {
    return this._dropDownItems;
  }

  getDataBasedOnType(type: string)
  {
    if(type === "status")
    {
      this._getStatusRequest();
    }
    else if(type === "type")
    {
      this._getTypeRequest();
    }
    else if(type === "location")
    {
      this._getCityRequest();
    }
    else if(type === "bedrooms")
    {
      this._dropDownItems = Array.from({length: this._maxRoomsCount}, (_, i) => (i + 1).toString());
      this._dropDownItems.unshift("Bedrooms");
    }
    else if(type === "orderby")
    {
      this._dropDownItems = this._orderByList;
    }
  }

  private _getStatusRequest()
  {
    this._statusService.getAll().subscribe
    (
      (Response:Status[]) => 
      {
        this._dropDownItems = Response.map(x => x.name);
        this._dropDownItems.unshift("Status");
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

  private _getTypeRequest()
  {
    this._typeService.getAll().subscribe
    (
      (Response:Type[]) => 
      {
        this._dropDownItems = Response.map(x => x.name);
        this._dropDownItems.unshift("Type");
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

  private _getCityRequest()
  {
    this._cityService.getAll().subscribe
    (
      (Response:City[]) => 
      {
        this._dropDownItems = Response.map(x => x.name);
        this._dropDownItems.unshift("Location");
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }
}
