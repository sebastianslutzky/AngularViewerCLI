import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectViewRowComponent } from './object-view-row.component';

describe('ObjectViewRowComponent', () => {
  let component: ObjectViewRowComponent;
  let fixture: ComponentFixture<ObjectViewRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectViewRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectViewRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
