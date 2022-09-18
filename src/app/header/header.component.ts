import { Menu } from '../shared/interface/menu';
import { MenuService } from './../services/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _menuService:MenuService) { }

  private _menuList: Menu[] = [];

  public get MenuItems(): Menu[]
  {
    return this._menuList;
  }

  ngOnInit(): void 
  {
    this._menuService.getAll().subscribe
    (
      (Response:Menu[]) => 
      {
        this._menuList = Response;
        console.log(this._menuList);
      },
      Error =>
      {
        alert("Internal server error, please try again later.");
        return;
      }
    )
  }

}
