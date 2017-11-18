import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarSectionComponent } from './menu-bar-section.component';

describe('MenuBarSectionComponent', () => {
  let component: MenuBarSectionComponent;
  let fixture: ComponentFixture<MenuBarSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBarSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
