import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTabComponent } from './object-tab.component';

describe('ObjectTabComponent', () => {
  let component: ObjectTabComponent;
  let fixture: ComponentFixture<ObjectTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
