import { TestBed } from '@angular/core/testing';

import { JwtExpiredOrNotExistGuardService } from './jwt-expired-or-not-exist-guard.service';

describe('JwtExpiredOrNotExistGuardService', () => {
  let service: JwtExpiredOrNotExistGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtExpiredOrNotExistGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
