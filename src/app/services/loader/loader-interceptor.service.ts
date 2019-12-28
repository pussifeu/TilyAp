import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { tap, catchError, timeout } from 'rxjs/operators';
import { LoaderService } from './loader.service';

const APP_XHR_TIMEOUT = 30000;
@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(APP_XHR_TIMEOUT),
      tap(
        async (event: HttpEvent<any>) => {
          await this.loaderService.show();
          if (event instanceof HttpResponse) {
            this.loaderService.hide();
          }
        },
        async (err: any) => {
          await this.loaderService.show();
          this.loaderService.hide();
          return this.handleErrorResponse(err)
        }
      ),
      catchError((err) => this.handleErrorResponse(err)));
  }

  private handleErrorResponse(errorResponse): Observable<any> {
    let customError: any = {};
    if (errorResponse instanceof TimeoutError || errorResponse instanceof HttpErrorResponse) {
      customError.message = 'Service unavailable, please try again later';
      return throwError(customError);
    }
    switch (errorResponse.status) {
      case 401: customError.message = 'Unauthorized';
        break;
      case 503: customError.message = 'Service unavailable';
        break;
      case 503: customError.message = 'Technical error, please contact administrator';
        break;
      default: customError.message = 'An error has occured';
    }
    return throwError(customError);
  }
}
