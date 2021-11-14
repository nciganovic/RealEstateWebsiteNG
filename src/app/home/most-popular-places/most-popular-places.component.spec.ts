import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularPlacesComponent } from './most-popular-places.component';

describe('MostPopularPlacesComponent', () => {
  let component: MostPopularPlacesComponent;
  let fixture: ComponentFixture<MostPopularPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
