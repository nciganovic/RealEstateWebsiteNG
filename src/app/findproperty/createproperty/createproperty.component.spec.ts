import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepropertyComponent } from './createproperty.component';

describe('CreatepropertyComponent', () => {
  let component: CreatepropertyComponent;
  let fixture: ComponentFixture<CreatepropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatepropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
