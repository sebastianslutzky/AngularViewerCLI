import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextParamComponent } from './text-param.component';

describe('TextParamComponent', () => {
  let component: TextParamComponent;
  let fixture: ComponentFixture<TextParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
