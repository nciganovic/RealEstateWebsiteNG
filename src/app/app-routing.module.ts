import { NotfoundComponent } from './notfound/notfound.component';
import { AuthorComponent } from './author/author.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindpropertyComponent } from './findproperty/findproperty.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'properties',component:FindpropertyComponent},
  {path:'author',component:AuthorComponent},
  {path:'not-found',component:NotfoundComponent},
  {path:'**',redirectTo:'/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
