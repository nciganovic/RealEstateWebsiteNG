import { Property } from '../../shared/interface/property';
import { PropertiesService } from './../../services/properties.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  @Input() editId: number = -1;
  @Output() editClicked = new EventEmitter();

  constructor(private _propertyService: PropertiesService) { }

  ngOnInit(): void {
    window.scroll(0,0);
  }

  public get Properties()
  {
    return this._propertyService.PropertyItems;
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
