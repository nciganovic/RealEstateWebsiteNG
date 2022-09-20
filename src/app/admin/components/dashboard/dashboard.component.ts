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

  removePropertyRequest(id: number)
  {
    this._propertyService.remove(id).subscribe
    (
      (Response:PropertyRecive[]) => {},
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

  deletePropertyClick($event: Event, id: number)
  {
    $event.preventDefault();
    this.removePropertyRequest(id);
    let propToRemove = this._properties.filter(x => x.id == id)[0];
    if(confirm("Are you sure you want to remove property from " + propToRemove.location.street.number + " " + propToRemove.location.street.name + ", " + propToRemove.location.city))
    {
      let idx = this._properties.indexOf(propToRemove);
      this._properties.splice(idx, 1);
    } 
  }
}
