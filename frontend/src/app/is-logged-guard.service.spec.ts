import { TestBed } from '@angular/core/testing';

import { IsLoggedGuardService } from './is-logged-guard.service';

describe('IsLoggedGuardService', () => {
  let service: IsLoggedGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsLoggedGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
