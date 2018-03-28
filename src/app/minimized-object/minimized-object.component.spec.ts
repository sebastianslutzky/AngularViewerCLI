import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimizedObjectComponent } from './minimized-object.component';

describe('MinimizedObjectComponent', () => {
  let component: MinimizedObjectComponent;
  let fixture: ComponentFixture<MinimizedObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimizedObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimizedObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
