import { TestBed, inject } from '@angular/core/testing';

import { ActionInvocationService } from './action-invocation.service';

describe('ActionInvocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionInvocationService]
    });
  });

  it('should be created', inject([ActionInvocationService], (service: ActionInvocationService) => {
    expect(service).toBeTruthy();
  }));
});
