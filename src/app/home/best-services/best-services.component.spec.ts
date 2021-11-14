import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestServicesComponent } from './best-services.component';

describe('BestServicesComponent', () => {
  let component: BestServicesComponent;
  let fixture: ComponentFixture<BestServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
