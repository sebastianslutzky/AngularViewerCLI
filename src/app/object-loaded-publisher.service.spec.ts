import { TestBed } from '@angular/core/testing';

import { ObjectLoadedPublisherService } from './object-loaded-publisher.service';

describe('ObjectLoadedPublisherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectLoadedPublisherService = TestBed.get(ObjectLoadedPublisherService);
    expect(service).toBeTruthy();
  });
});
