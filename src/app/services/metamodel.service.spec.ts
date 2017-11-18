import { TestBed, inject } from '@angular/core/testing';

import { MetamodelService } from './metamodel.service';

describe('MetamodelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetamodelService]
    });
  });

  it('should be created', inject([MetamodelService], (service: MetamodelService) => {
    expect(service).toBeTruthy();
  }));
});
