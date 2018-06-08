import { TestBed, inject } from '@angular/core/testing';

import { ObjectStoreService } from './object-store.service';

describe('ObjectStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectStoreService]
    });
  });

  it('should be created', inject([ObjectStoreService], (service: ObjectStoreService) => {
    expect(service).toBeTruthy();
  }));
});
