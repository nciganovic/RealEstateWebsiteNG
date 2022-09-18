import { Property, PropertyRecive } from '../../shared/interface/property';
import { PropertiesService } from './../../services/properties.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  private _properties: Property[] = [];

  @Input() editId: number = -1;
  @Output() editClicked = new EventEmitter();

  constructor(private _propertyService: PropertiesService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getPropertiesRequest();
  }

  public get Properties()
  {
    return this._properties;
  }

  getPropertiesRequest()
  {
    this._propertyService.getAll().subscribe
    (
      (Response:PropertyRecive[]) => 
      {
        let propertyRecive: PropertyRecive[] = Response

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

  public onEdit(event: Event, id: number)
  {
    event.preventDefault();
    this.editId = id;
    this.editClicked.emit(id.toString());
  }

  public onRemove(event: Event, id: number)
  {
    event.preventDefault();
    if(confirm("Are you sure you want to remove this property?"))
      this._propertyService.removeProperty(id.toString());
  }
}
