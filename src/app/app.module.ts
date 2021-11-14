import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './home/banner/banner.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { BestServicesComponent } from './home/best-services/best-services.component';
import { MostPopularPlacesComponent } from './home/most-popular-places/most-popular-places.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FindpropertyComponent } from './findproperty/findproperty.component';
import { AuthorComponent } from './author/author.component';
import { FilterComponent } from './findproperty/filter/filter.component';
import { PropertyComponent } from './findproperty/property/property.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    WelcomeComponent,
    BestServicesComponent,
    MostPopularPlacesComponent,
    ContactUsComponent,
    FindpropertyComponent,
    AuthorComponent,
    FilterComponent,
    PropertyComponent,
    DropdownComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
