import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TypeService } from 'src/app/services/type.service';
import { StatusService } from 'src/app/services/status.service';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/shared/interface/city';
import { Type } from 'src/app/shared/interface/type';
import { Status } from 'src/app/shared/interface/status';
import { OwnerService } from 'src/app/services/owner.service';
import { Owner } from 'src/app/shared/interface/owner';
import { LocationToSend } from 'src/app/shared/interface/location';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '@angular/common';
import { Property, PropertyRecive, PropertyToSend } from 'src/app/shared/interface/property';
import { PropertiesService } from 'src/app/services/properties.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css'],
  animations:[
    trigger("valid",[
      state("true",style({border:'1px solid #495057'})),
      state("false",style({border:'1px solid red'})),
      transition("true => false",animate('1100ms ease-out')),
      transition("false => true",animate('1000ms ease-in'))
    ])
  ]
})
export class CreatePropertyComponent implements OnInit {

  private _property: Property;
  private _types: Type[] = [];
  private _statuses: Status[] = [];
  private _cities: City[] = [];
  private _owners: Owner[] = [];

  private _id: number;
  private sub: any;

  public form!:FormGroup;
  public isEditMode: boolean = false;

  constructor(private _typeService: TypeService,
    private _statusService: StatusService,
    private _cityService: CityService,
    private _ownerService: OwnerService,
    private _locationService: LocationService,
    private _propertiesService: PropertiesService,
    private _location: Location,
    private _route: ActivatedRoute, 
    private _router: Router) { }

  ngOnInit(): void {
    this.sub = this._route.params.subscribe(params => {
      this._id = +params['id']; 
    });

    this.form = new FormGroup({
      propertyId: new FormControl(),
      streetName: new FormControl(),
      streetNumber: new FormControl(),
      location: new FormControl(),
      status: new FormControl(),
      price: new FormControl(),
      type: new FormControl(),
      rooms: new FormControl(),
      owner: new FormControl(),
    });

    if(this._id)
    {
      this._getPropertyRequest();
      this.isEditMode = true;
    }
    else
    {
      this.form.controls.location.setValue("");
      this.form.controls.status.setValue("");
      this.form.controls.owner.setValue("");
      this.form.controls.type.setValue("");
    }

    this._getPropertyRequest();
    this._getCityRequest();
    this._getStatusRequest();
    this._getTypeRequest();
    this._getOwnersRequest();
  }

  public get Property()
  {
    return this._property;
  }

  public get Types(): Type[]
  {
    return this._types;
  }

  public get Statuses(): Status[]
  {
    return this._statuses;
  }

  public get Locations(): City[]
  {
    return this._cities;
  }

  public get Owners(): Owner[]
  {
    return this._owners;
  }

  onSubmitPropertyForm()
  {
    this.form = new FormGroup({
      propertyId: new FormControl(this.form.get("propertyId")?.value),
      streetName: new FormControl(this.form.get("streetName")?.value, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      streetNumber: new FormControl(this.form.get("streetNumber")?.value, [Validators.required, Validators.maxLength(50)]),
      location: new FormControl(this.form.get("location")?.value, [Validators.required]),
      status: new FormControl(this.form.get("status")?.value, [Validators.required]),
      price: new FormControl(this.form.get("price")?.value, [Validators.required, Validators.min(100), Validators.max(1000000)]),
      type: new FormControl(this.form.get("type")?.value, [Validators.required]),
      rooms: new FormControl(this.form.get("rooms")?.value, [Validators.required, Validators.min(1), Validators.max(10)]),
      owner: new FormControl(this.form.get("owner")?.value, [Validators.required]),
    });

    if(this.form.valid)
    {
      let location: LocationToSend = {
        streetName: this.form.controls.streetName.value,
        streetNumber: this.form.controls.streetNumber.value,
        cityId: this.form.controls.location.value,
      };

      if(this._id)
        this._patchLocationRequest(location, this.form);
      else
        this._postLocationRequest(location, this.form);
    }
  }

  onSubmit()
  {

  }

  private _getStatusRequest()
  {
    this._statusService.getAll().subscribe
    (
      (Response:Status[]) => 
      {
        this._statuses = Response;
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
        this._types = Response
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
        this._cities = Response;
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

  private _getOwnersRequest()
  {
    this._ownerService.getAll().subscribe
    (
      (Response:Owner[]) => 
      {
        this._owners = Response;
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

  private _getPropertyRequest()
  {
    this._propertiesService.getById(this._id).subscribe
    (
      (Response:PropertyRecive) => 
      {
        if(!this._id)
          return;

        this._property = this._propertiesService.mapProperties(Response);

        this.form.controls.streetName.setValue(Response.streetName);
        this.form.controls.streetNumber.setValue(Response.streetNumber);
        this.form.controls.location.setValue(Response.cityId);
        this.form.controls.status.setValue(Response.statusId);
        this.form.controls.owner.setValue(Response.ownerId);
        this.form.controls.price.setValue(Response.price);
        this.form.controls.type.setValue(Response.typeId);
        this.form.controls.rooms.setValue(Response.rooms);
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

  private _postLocationRequest(dataToSend: LocationToSend, form: FormGroup)
  {
    this._locationService.add(dataToSend).subscribe({
      next: res =>{
        let newlyCreatedLocationId = res;

        let propertyData: PropertyToSend = {
          locationId: newlyCreatedLocationId,
          statusId: form.controls.status.value,
          price: form.controls.price.value,
          typeId: form.controls.type.value,
          rooms: form.controls.rooms.value,
          ownerId: form.controls.owner.value,
          date: new Date(),
          img: "h30.jpg"
        };

        this._postPropertyRequset(propertyData);
      }
    })
  }

  private _patchLocationRequest(dataToSend: LocationToSend, form: FormGroup)
  {
    this._locationService.update(this._property.location.id ?? -1, dataToSend).subscribe({
      next: res =>{
        let locationId = res;

        if(this._id)
          locationId = this._property.location.id;

        let propertyData: PropertyToSend = {
          locationId: locationId,
          statusId: form.controls.status.value,
          price: form.controls.price.value,
          typeId: form.controls.type.value,
          rooms: form.controls.rooms.value,
          ownerId: form.controls.owner.value,
          date: new Date(),
          img: "h30.jpg"
        };

        this._patchPropertyRequset(propertyData);
      }
    })
  }

  private _postPropertyRequset(dataToSend: PropertyToSend)
  {
    this._propertiesService.add(dataToSend).subscribe({
      next: res =>{
        alert("Property added successfully!");
        this._location.back();
      }
    })
  }

  private _patchPropertyRequset(dataToSend: PropertyToSend)
  {
    this._propertiesService.update(this._id, dataToSend).subscribe({
      next: res =>{
        alert("Property updated successfully!");
        this._location.back();
      }
    })
  }
}
