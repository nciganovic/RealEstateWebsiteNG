import { Property } from '../../shared/interface/property';
import { PropertiesService } from './../../services/properties.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  constructor(private _propertyService: PropertiesService) { }

  ngOnInit(): void {
    window.scroll(0,0);
  }

  public get Properties()
  {
    return this._propertyService.PropertyItems;
  }

  public onRemove(event: Event, id: number)
  {
    event.preventDefault();
    if(confirm("Are you sure you want to remove this property?"))
      this._propertyService.removeProperty(id.toString());
  }
}
