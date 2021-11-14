import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations:[
    trigger("valid",[
      state("true",style({border:'none'})),
      state("false",style({border:'1px solid red'})),
      transition("true => false",animate('1100ms ease-out')),
      transition("false => true",animate('1000ms ease-in'))
    ])
  ]
})
export class ContactUsComponent implements OnInit {

  form!:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl,
      email: new FormControl,
      subject: new FormControl,
      message: new FormControl,
    });
  }

  onSubmit()
  {
    this.form = new FormGroup({
      name: new FormControl(this.form.get("name")?.value, [Validators.required, Validators.pattern(/^[a-zA-Z/šđčćžŠĐČŽĆ]{2,30}(([a-zA-Z/šđčćžŠĐČŽĆ ])?[a-zAZ/šđčćžŠĐČŽĆ]*)*$/)]),
      email: new FormControl(this.form.get("email")?.value,[Validators.required,Validators.email]),
      subject: new FormControl(this.form.get("subject")?.value,[Validators.required, Validators.minLength(2),Validators.maxLength(30)]),
      message: new FormControl(this.form.get("message")?.value,[Validators.required,Validators.minLength(2),Validators.maxLength(500)]),
    });

    if(this.form.valid)
    {
      alert("Message sent");
      this.form.reset();
      window.location = window.location;
    }
  }
}
