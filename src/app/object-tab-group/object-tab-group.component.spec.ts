import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTabGroupComponent } from './object-tab-group.component';

describe('ObjectTabGroupComponent', () => {
  let component: ObjectTabGroupComponent;
  let fixture: ComponentFixture<ObjectTabGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTabGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
