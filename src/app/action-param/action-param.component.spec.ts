import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionParamComponent } from './action-param.component';

describe('ActionParamComponent', () => {
  let component: ActionParamComponent;
  let fixture: ComponentFixture<ActionParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
