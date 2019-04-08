import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTesterComponent } from './route-tester.component';

describe('RouteTesterComponent', () => {
  let component: RouteTesterComponent;
  let fixture: ComponentFixture<RouteTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
