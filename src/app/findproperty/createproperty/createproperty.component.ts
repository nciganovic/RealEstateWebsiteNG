import { Component, OnInit } from '@angular/core';
import { PropertiesService } from './../../services/properties.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

  constructor(private _propertyService: PropertiesService) { }

  public form!:FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(),
      location: new FormControl(),
      status: new FormControl(),
      price: new FormControl(),
      type: new FormControl(),
      rooms: new FormControl(),
      owner: new FormControl(),
      date: new FormControl(),
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
    this.form = new FormGroup({
      title: new FormControl(this.form.get("title")?.value, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      location: new FormControl(this.form.get("location")?.value, [Validators.required]),
      status: new FormControl(this.form.get("status")?.value, [Validators.required]),
      price: new FormControl(this.form.get("price")?.value, [Validators.required, Validators.min(0), Validators.max(1000000)]),
      type: new FormControl(this.form.get("type")?.value, [Validators.required]),
      rooms: new FormControl(this.form.get("rooms")?.value, [Validators.required, Validators.min(1), Validators.max(10)]),
      owner: new FormControl(this.form.get("owner")?.value, [Validators.required, Validators.maxLength(50)]),
      date: new FormControl(this.form.get("date")?.value, [Validators.required]),
    });

    if(this.form.valid)
    {
      alert("Message sent");
      this.form.reset();
      window.location = window.location;
    }
  }

  public onAddProperty()
  {
    console.log("Add property");
    this.isFormVisible = true;
  }

  public onSubmitPropertyForm()
  {

  }

  public onClosePropertyForm()
  {
    this.isFormVisible = false;
  }
}
