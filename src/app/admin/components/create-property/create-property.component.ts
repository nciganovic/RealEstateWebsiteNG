import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TypeService } from 'src/app/services/type.service';
import { StatusService } from 'src/app/services/status.service';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/shared/interface/city';
import { Type } from 'src/app/shared/interface/type';
import { Status } from 'src/app/shared/interface/status';

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

  private _types: Type[] = [];
  private _statuses: Status[] = [];
  private _cities: City[] = [];

  public form!:FormGroup;

  constructor(private _typeService: TypeService,
    private _statusService: StatusService,
    private _cityService: CityService) { }

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

    this._getCityRequest();
    this._getStatusRequest();
    this._getTypeRequest();
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

  onSubmitPropertyForm()
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
}
