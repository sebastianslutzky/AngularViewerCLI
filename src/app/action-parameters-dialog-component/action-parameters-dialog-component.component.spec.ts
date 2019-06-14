import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionParametersDialogComponentComponent } from './action-parameters-dialog-component.component';

describe('ActionParametersDialogComponentComponent', () => {
  let component: ActionParametersDialogComponentComponent;
  let fixture: ComponentFixture<ActionParametersDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionParametersDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionParametersDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
