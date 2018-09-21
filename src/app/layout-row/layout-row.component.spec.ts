import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRowComponent } from './layout-row.component';

describe('LayoutRowComponent', () => {
  let component: LayoutRowComponent;
  let fixture: ComponentFixture<LayoutRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
