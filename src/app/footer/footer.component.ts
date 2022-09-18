import { Social } from '../shared/interface/social';
import { SocialService } from './../services/social.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _socialService: SocialService) { }

  private _socialItems: Social[] = [];

  public get SocialItems(): Social[]
  {
    return this._socialItems;
  }

  ngOnInit(): void 
  {
    this._socialService.getAll().subscribe
    (
      (Response:Social[]) => 
      {
        this._socialItems = Response;
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return;
      }
    )
  }

  public goToTop()
  {
    window.scroll(0,0);
  }
}
