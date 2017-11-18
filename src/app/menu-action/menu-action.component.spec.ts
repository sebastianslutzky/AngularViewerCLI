import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuActionComponent } from './menu-action.component';

describe('MenuActionComponent', () => {
  let component: MenuActionComponent;
  let fixture: ComponentFixture<MenuActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
