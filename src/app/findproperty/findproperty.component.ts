import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { Filter } from '../shared/interface/filter';
import { Property } from '../shared/interface/property';
import { CreatepropertyComponent } from './createproperty/createproperty.component';
import { PropertyComponent } from './property/property.component';

@Component({
  selector: 'app-findproperty',
  templateUrl: './findproperty.component.html',
  styleUrls: ['./findproperty.component.css']
})
export class FindpropertyComponent implements OnInit {

  @ViewChild(CreatepropertyComponent)
  private createPropertyComponent: CreatepropertyComponent;

  @ViewChild(PropertyComponent)
  private _propertyComponent: PropertyComponent;


  constructor(private propertyService: PropertiesService) { }

  ngOnInit(): void {

  }

  onEditClicked(event: any)
  {
    window.scroll(0, 0);
    this.createPropertyComponent.isFormVisible = true;
    this.createPropertyComponent.isCreateMode = false;

    let propToEdit: Property = this.propertyService.PropertyItems.filter(x => x.id === Number(event))[0];

    this.createPropertyComponent.form.controls.propertyId.setValue(propToEdit.id);
    this.createPropertyComponent.form.controls.streetName.setValue(propToEdit.location.street.name);
    this.createPropertyComponent.form.controls.streetNumber.setValue(propToEdit.location.street.number);
    this.createPropertyComponent.form.controls.location.setValue(propToEdit.location.city);
    this.createPropertyComponent.form.controls.status.setValue(propToEdit.status);
    this.createPropertyComponent.form.controls.price.setValue(propToEdit.price);
    this.createPropertyComponent.form.controls.type.setValue(propToEdit.type);
    this.createPropertyComponent.form.controls.rooms.setValue(propToEdit.rooms);
    this.createPropertyComponent.form.controls.firstName.setValue(propToEdit.owner.firstName);
    this.createPropertyComponent.form.controls.lastName.setValue(propToEdit.owner.lastName);
    this.createPropertyComponent.form.controls.email.setValue(propToEdit.owner.email);
    this.createPropertyComponent.form.controls.phoneNumber.setValue(propToEdit.owner.phoneNumber);
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
