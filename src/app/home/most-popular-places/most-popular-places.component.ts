import { PlacesService } from './../../services/places.service';
import { Place } from '../../shared/interface/place';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-most-popular-places',
  templateUrl: './most-popular-places.component.html',
  styleUrls: ['./most-popular-places.component.css']
})
export class MostPopularPlacesComponent implements OnInit {

  private _popularPlaces: Place[] = [];

  constructor(private _popularPlacesService: PlacesService) { }

  public get PopularPlaces()
  {
    return this._popularPlaces;
  }

  ngOnInit(): void 
  {

    this._popularPlacesService.getPopularPlaces().subscribe
    (
      (Response:Place[]) => 
      {
        this._popularPlaces = Response;
        console.log(this._popularPlaces);
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

}
