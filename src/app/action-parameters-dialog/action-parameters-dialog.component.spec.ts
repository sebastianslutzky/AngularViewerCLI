import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionParametersDialogComponent } from './action-parameters-dialog.component';

describe('ActionParametersDialogComponent', () => {
  let component: ActionParametersDialogComponent;
  let fixture: ComponentFixture<ActionParametersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionParametersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionParametersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
