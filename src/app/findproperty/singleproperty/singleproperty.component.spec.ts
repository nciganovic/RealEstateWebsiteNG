import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepropertyComponent } from './singleproperty.component';

describe('SinglepropertyComponent', () => {
  let component: SinglepropertyComponent;
  let fixture: ComponentFixture<SinglepropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglepropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
