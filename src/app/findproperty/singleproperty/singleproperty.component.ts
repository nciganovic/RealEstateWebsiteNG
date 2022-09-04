import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Property } from 'src/app/shared/interface/property';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-singleproperty',
  templateUrl: './singleproperty.component.html',
  styleUrls: ['./singleproperty.component.css']
})
export class SinglepropertyComponent implements OnInit {

  id: number = 0;
  private sub: any;
  private property: Property = {} as Property;

  constructor(private route: ActivatedRoute, private router: Router,
    private propertiesService: PropertiesService) {
    
      
   }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      console.log(this.id);
      this.propertiesService.getPropertiesRequest();
   });
  }

    public get SingleProperty(): Property
    {
      let item = this.propertiesService.PropertyItems[this.id]
      if(!item)
        this.router.navigate(['/not-found']);
      return item;
    }
}
