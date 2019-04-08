import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActionResultComponent } from './list-action-result.component';

describe('ListActionResultComponent', () => {
  let component: ListActionResultComponent;
  let fixture: ComponentFixture<ListActionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListActionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
