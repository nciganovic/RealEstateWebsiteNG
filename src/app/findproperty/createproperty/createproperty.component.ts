import { Component, OnInit } from '@angular/core';
import { PropertiesService } from './../../services/properties.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Property } from '../../shared/interface/property';
import { Location } from '../../shared/interface/location';
import { Street } from 'src/app/shared/interface/street';
import { Owner } from 'src/app/shared/interface/owner';

@Component({
  selector: 'app-createproperty',
  templateUrl: './createproperty.component.html',
  styleUrls: ['./createproperty.component.css'],
  animations:[
    trigger("valid",[
      state("true",style({border:'1px solid #495057'})),
      state("false",style({border:'1px solid red'})),
      transition("true => false",animate('1100ms ease-out')),
      transition("false => true",animate('1000ms ease-in'))
    ])
  ]
})

export class CreatepropertyComponent implements OnInit {

  public isFormVisible: boolean = false;
  public isCreateMode: boolean = true;

  constructor(private _propertyService: PropertiesService) { }

  public form!:FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      propertyId: new FormControl(),
      streetName: new FormControl(),
      streetNumber: new FormControl(),
      location: new FormControl(),
      status: new FormControl(),
      price: new FormControl(),
      type: new FormControl(),
      rooms: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
    });
  }

  public get Locations(): string[]
  {
    return this._propertyService.getLocaitonUniqueValues(this._propertyService.PropertyItems);
  }

  public get Statuses(): string[]
  {
    return this._propertyService.getStatusUniqueValues(this._propertyService.PropertyItems);
  }

  public get Types(): string[]
  {
    return this._propertyService.getTypeUniqueValues(this._propertyService.PropertyItems);
  }

  onSubmit()
  {
    
  }

  public onAddProperty()
  {
    this.isFormVisible = true;
    this.isCreateMode = true;
    this.form.reset();
  }

  public onSubmitPropertyForm()
  {
    this.form = new FormGroup({
      propertyId: new FormControl(this.form.get("propertyId")?.value),
      streetName: new FormControl(this.form.get("streetName")?.value, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      streetNumber: new FormControl(this.form.get("streetNumber")?.value, [Validators.required]),
      location: new FormControl(this.form.get("location")?.value, [Validators.required]),
      status: new FormControl(this.form.get("status")?.value, [Validators.required]),
      price: new FormControl(this.form.get("price")?.value, [Validators.required, Validators.min(100), Validators.max(1000000)]),
      type: new FormControl(this.form.get("type")?.value, [Validators.required]),
      rooms: new FormControl(this.form.get("rooms")?.value, [Validators.required, Validators.min(1), Validators.max(10)]),
      firstName: new FormControl(this.form.get("firstName")?.value, [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl(this.form.get("lastName")?.value, [Validators.required, Validators.maxLength(30)]),
      email: new FormControl(this.form.get("email")?.value, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.form.get("phoneNumber")?.value, [Validators.required, Validators.maxLength(15)]),
    });

    if(this.form.valid)
    { 
      const item : Property = {
        id: this.getRndInteger(100, 1000),
        location: this.getLocationData(),
        owner: this.getOwnerData(),
        status: this.form.controls.status.value,
        type: this.form.controls.type.value,
        rooms: this.form.controls.rooms.value,
        date: new Date(),
        price: this.form.controls.price.value,
        img: "h22.jpg",
      }

      this._propertyService.PropertyItems.unshift(item);
      this.form.reset();
      this.isFormVisible = false;
      localStorage.setItem("items", JSON.stringify(this._propertyService.PropertyItems));
      alert("Property added successfully.");
    }
  }

  public onEditPropertyForm()
  {
    if(this.form.valid)
    { 
      const item : Property = {
        id: this.form.controls.propertyId.value,
        location: this.getLocationData(),
        owner: this.getOwnerData(),
        status: this.form.controls.status.value,
        type: this.form.controls.type.value,
        rooms: this.form.controls.rooms.value,
        date: new Date(),
        price: this.form.controls.price.value,
        img: "",
      }

      let currentProp = this._propertyService.PropertyItems.filter(x => x.id === item.id)[0];
      currentProp.location = item.location;
      currentProp.owner = item.owner;
      currentProp.status = item.status;
      currentProp.type = item.type;
      currentProp.rooms = item.rooms;
      currentProp.date = new Date();
      currentProp.price = item.price;

      this.form.reset();
      this.isFormVisible = false;
      localStorage.setItem("items", JSON.stringify(this._propertyService.PropertyItems));
      alert("Property edited successfully.");
    }
  }

  public getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  public getStreetData()
  {
    let street: Street = {
      name: this.form.controls.streetName.value,
      number: this.form.controls.streetNumber.value,
    };
    return street;
  }

  public getLocationData()
  {
    let loc: Location = {
      street: this.getStreetData(),
      city: this.form.controls.location.value,
      country: this.getCountryByCity(this.form.controls.location.value)
    };
    return loc;
  }

  public getOwnerData()
  {
    let owner: Owner = {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      email: this.form.controls.email.value,
      phoneNumber: this.form.controls.phoneNumber.value
    };
    return owner;
  }

  public onClosePropertyForm()
  {
    this.isFormVisible = false;
  }

  public getCountryByCity(city: string): string
  {
    switch(city)
    {
      case "New York" || "Los Angeles":
        return "USA";
      case "Madrid":
        return "Spain";
      case "Paris":
        return "France";
    }

    return "";
  }
}
