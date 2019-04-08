import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapObjectComponent } from './bootstrap-object.component';

describe('BootstrapObjectComponent', () => {
  let component: BootstrapObjectComponent;
  let fixture: ComponentFixture<BootstrapObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
