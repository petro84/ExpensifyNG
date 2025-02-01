import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { secureAuthGuard } from './secure-auth.guard';

describe('secureAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => secureAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
