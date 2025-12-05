import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { LoggingService } from '@shared/services/logging.service';
import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
describe('HttpErrorInterceptor', () => {
  let interceptor: HttpErrorInterceptor;
  let loggingServiceMock: jasmine.SpyObj<LoggingService>;
  let mockHandler: jasmine.SpyObj<HttpHandler>;
  let mockRequest: HttpRequest<any>;

  beforeEach(() =>{ 
    loggingServiceMock = jasmine.createSpyObj('LoggingService', ['logHttpError']);
    mockHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
    TestBed.configureTestingModule({
    
    providers: [
      HttpErrorInterceptor,
      { provide: LoggingService, useValue: loggingServiceMock }
      ]
      
  })
  interceptor = TestBed.inject(HttpErrorInterceptor);
  mockRequest = new HttpRequest('GET', '/test');
  });

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should call loggingService.logHttpError when error occurs', () => {
    const errorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request'
    });

    mockHandler.handle.and.returnValue(throwError(() => errorResponse));

    interceptor.intercept(mockRequest, mockHandler).subscribe({
      error: err => {
        expect(err).toBe(errorResponse);
        expect(loggingServiceMock.logHttpError).toHaveBeenCalledWith(errorResponse);
      }
    });
  });

  const statusCodes = [400, 401, 404, 500];

  statusCodes.forEach(status => {
    it(`should handle HTTP error status ${status}`, () => {
      const errorResponse = new HttpErrorResponse({ status });

      spyOn(console, 'warn');

      mockHandler.handle.and.returnValue(throwError(() => errorResponse));

      interceptor.intercept(mockRequest, mockHandler).subscribe({
        error: err => {
          expect(err.status).toBe(status);
          expect(console.warn).toHaveBeenCalled();
          expect(loggingServiceMock.logHttpError).toHaveBeenCalled();
        }
      });
    });
  });
  it('should pass request through when no error occurs', () => {
  const httpResponse = new HttpResponse({ status: 200, body: { ok: true } });

  mockHandler.handle.and.returnValue(of(httpResponse));

  interceptor.intercept(mockRequest, mockHandler).subscribe(event => {
    expect(event).toEqual(httpResponse);
  });
});

});
