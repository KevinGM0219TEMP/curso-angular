import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoggingService } from '@shared/services/logging.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private loggingService:LoggingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('HttpErrorIntercceptor:',request);
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        this.loggingService.logHttpError(error);

        switch(error.status){
          case 400:
            console.warn('Bad Request: The server could not understand the request.');
            break;
          case 401:
            console.warn('Unathorized: Access is denied due to invalid credentials.');
            break;
          case 404:
            console.warn('Not Found: The requested resorce could not be found.');
            break;
          case 500:
            console.warn('Internal Server Error:An error ocurred on the server.');
            break;
        }

      return throwError(()=>error);
      })
    );
  }
}
