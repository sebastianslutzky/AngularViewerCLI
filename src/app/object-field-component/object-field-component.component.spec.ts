import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectFieldComponentComponent } from './object-field-component.component';

describe('ObjectFieldComponentComponent', () => {
  let component: ObjectFieldComponentComponent;
  let fixture: ComponentFixture<ObjectFieldComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectFieldComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectFieldComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
