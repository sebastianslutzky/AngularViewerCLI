import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectRouterComponent } from './object-router.component';

describe('ObjectRouterComponent', () => {
  let component: ObjectRouterComponent;
  let fixture: ComponentFixture<ObjectRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
