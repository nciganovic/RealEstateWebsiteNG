import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Property, PropertyRecive } from 'src/app/shared/interface/property';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-singleproperty',
  templateUrl: './singleproperty.component.html',
  styleUrls: ['./singleproperty.component.css']
})
export class SinglepropertyComponent implements OnInit {

  id: number = 0;
  private sub: any;
  private _property: Property;

  constructor(private route: ActivatedRoute, private router: Router,
    private _propertyService: PropertiesService) {
    
      
   }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
   });

   this.getPropertyById(this.id)
  }

  public get SingleProperty(): Property
  {
    return this._property;
  }

  getPropertyById(id: number)
  {
    this._propertyService.getById(id).subscribe
    (
      (Response:PropertyRecive) => 
      {
        let propertyRecive: PropertyRecive = Response
 
        this._property = this._propertyService.mapProperties(propertyRecive);

        if(!this._property.id)
          this.router.navigate(['/not-found']);
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }
}
