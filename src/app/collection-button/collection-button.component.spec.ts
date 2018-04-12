import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionButtonComponent } from './collection-button.component';

describe('CollectionButtonComponent', () => {
  let component: CollectionButtonComponent;
  let fixture: ComponentFixture<CollectionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
