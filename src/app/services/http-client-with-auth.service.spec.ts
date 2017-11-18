import { TestBed, inject } from '@angular/core/testing';

import { HttpClientWithAuthService } from './http-client-with-auth.service';

describe('HttpClientWithAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientWithAuthService]
    });
  });

  it('should be created', inject([HttpClientWithAuthService], (service: HttpClientWithAuthService) => {
    expect(service).toBeTruthy();
  }));
});
