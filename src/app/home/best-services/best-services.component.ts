import { Service } from '../../shared/interface/service';
import { BestservicesService } from './../../services/bestservices.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-services',
  templateUrl: './best-services.component.html',
  styleUrls: ['./best-services.component.css']
})
export class BestServicesComponent implements OnInit {

  private _serviceItems: Service[] = [];

  constructor(private _bestservicesService: BestservicesService) { }

  public get ServiceItems()
  {
    return this._serviceItems;
  }


  ngOnInit(): void 
  {
    this._bestservicesService.getAll().subscribe
    (
      (Response:Service[]) => 
      {
        this._serviceItems = Response;
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return null;
      }
    )
  }

}
