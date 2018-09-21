import { TestBed, inject } from '@angular/core/testing';

import { LayoutComponentFactoryService } from './layout-component-factory.service';

describe('LayoutComponentFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutComponentFactoryService]
    });
  });

  it('should be created', inject([LayoutComponentFactoryService], (service: LayoutComponentFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
