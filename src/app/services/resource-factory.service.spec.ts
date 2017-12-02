import { TestBed, inject } from '@angular/core/testing';

import { ResourceFactoryService } from './resource-factory.service';

describe('ResourceFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceFactoryService]
    });
  });

  it('should be created', inject([ResourceFactoryService], (service: ResourceFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
