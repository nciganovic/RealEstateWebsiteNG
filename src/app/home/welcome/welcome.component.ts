import { WelcomeService } from './../../services/welcome.service';
import { Component, OnInit } from '@angular/core';
import { Welcome } from 'src/app/shared/interface/welcome';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private _welcomeItems: Welcome[] = [];

  constructor(private _welcomeService: WelcomeService) { }

  public get Title()
  {
    return "The place to find house you want";
  }

  public get WelcomeItems()
  {
    return this._welcomeItems;
  }

  ngOnInit(): void 
  {
    this._welcomeService.getAll().subscribe
    (
      (Response:Welcome[]) => 
      {
        this._welcomeItems = Response;
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

}
