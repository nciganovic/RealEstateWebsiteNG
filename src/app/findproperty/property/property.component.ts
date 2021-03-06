import { Property } from './../../interface/property';
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
    
  }

  public get Properties()
  {
    return this._propertyService.PropertyItems;
  }

  public onRemove(event: Event)
  {
    event.preventDefault();
    let elementId: string = (event.target as Element).id;
    console.log(elementId);
    this._propertyService.removeProperty(elementId);
  }
}
