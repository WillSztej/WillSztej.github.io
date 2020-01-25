import { TestBed } from '@angular/core/testing';

import { FountainService } from './fountain.service';

describe('FountainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FountainService = TestBed.get(FountainService);
    expect(service).toBeTruthy();
  });
});
