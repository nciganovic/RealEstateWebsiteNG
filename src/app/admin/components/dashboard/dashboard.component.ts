import { Component, OnInit } from '@angular/core';
import { PropertiesService } from 'src/app/services/properties.service';
import { Property, PropertyRecive } from 'src/app/shared/interface/property';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private _properties: Property[] = [];

  constructor(private _propertyService: PropertiesService) { }

  public get Properties()
  {
    return this._properties;
  }

  ngOnInit(): void {
    this.getPropertiesRequest();
  }

  getPropertiesRequest()
  {
    this._propertyService.getAll().subscribe
    (
      (Response:PropertyRecive[]) => 
      {
        let propertyRecive: PropertyRecive[] = Response
        this._properties = [];
        for(let prop of propertyRecive)
          this._properties.push(this._propertyService.mapProperties(prop))

      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }
}
