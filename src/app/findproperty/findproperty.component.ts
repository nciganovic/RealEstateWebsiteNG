import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
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
  private propertyComponent: CreatepropertyComponent;


  constructor(private propertyService: PropertiesService) { }

  ngOnInit(): void {

  }

  onEditClicked(event: any)
  {
    window.scroll(0, 0);
    this.propertyComponent.isFormVisible = true;
    this.propertyComponent.isCreateMode = false;

    let propToEdit: Property = this.propertyService.PropertyItems.filter(x => x.id === Number(event))[0];

    this.propertyComponent.form.controls.propertyId.setValue(propToEdit.id);
    this.propertyComponent.form.controls.streetName.setValue(propToEdit.location.street.name);
    this.propertyComponent.form.controls.streetNumber.setValue(propToEdit.location.street.number);
    this.propertyComponent.form.controls.location.setValue(propToEdit.location.city);
    this.propertyComponent.form.controls.status.setValue(propToEdit.status);
    this.propertyComponent.form.controls.price.setValue(propToEdit.price);
    this.propertyComponent.form.controls.type.setValue(propToEdit.type);
    this.propertyComponent.form.controls.rooms.setValue(propToEdit.rooms);
    this.propertyComponent.form.controls.firstName.setValue(propToEdit.owner.firstName);
    this.propertyComponent.form.controls.lastName.setValue(propToEdit.owner.lastName);
    this.propertyComponent.form.controls.email.setValue(propToEdit.owner.email);
    this.propertyComponent.form.controls.phoneNumber.setValue(propToEdit.owner.phoneNumber);
  }
}
