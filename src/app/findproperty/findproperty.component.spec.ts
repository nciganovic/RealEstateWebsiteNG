import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindpropertyComponent } from './findproperty.component';

describe('FindpropertyComponent', () => {
  let component: FindpropertyComponent;
  let fixture: ComponentFixture<FindpropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindpropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
