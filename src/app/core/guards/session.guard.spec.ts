import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { sessionGuard } from './session.guard';
import { CookieService } from 'ngx-cookie-service';

describe('sessionGuard', () => {
  let cookieServiceMock: jasmine.SpyObj<CookieService>;
  let routerMock: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sessionGuard(...guardParameters));

  beforeEach(() => {
    cookieServiceMock = jasmine.createSpyObj('CookieService', ['check']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService, useValue: cookieServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
   it('should allow access when token exists', () => {
    cookieServiceMock.check.and.returnValue(true);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should block access and navigate when token is missing', () => {
    cookieServiceMock.check.and.returnValue(false);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/','auth']);
  });
});
