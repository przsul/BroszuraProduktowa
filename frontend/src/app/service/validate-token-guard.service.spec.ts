import { TestBed } from '@angular/core/testing';

import { ValidateTokenGuardService } from './validate-token-guard.service';

describe('ValidateTokenGuardService', () => {
  let service: ValidateTokenGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateTokenGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
