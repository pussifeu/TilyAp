import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { tap, catchError, timeout } from 'rxjs/operators';
import { LoaderService } from './loader.service';

const APP_XHR_TIMEOUT = 30000;
@Injectable()
export class LoaderInterceptorService implements HttpInterceptor{

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    return next.handle(req).pipe(
      timeout(APP_XHR_TIMEOUT),
      tap((event: HttpEvent<any>) => { 
        if (event instanceof HttpResponse) {this.onEnd();}
      },(err: any) => {this.onEnd();}),
    catchError((err) => this.handleErrorResponse(err)),);

  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

  private handleErrorResponse(errorResponse): Observable<HttpEvent<any>> {
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
