import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutColumnComponent } from './layout-column.component';

describe('LayoutColumnComponent', () => {
  let component: LayoutColumnComponent;
  let fixture: ComponentFixture<LayoutColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
