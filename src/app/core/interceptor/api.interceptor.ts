import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url[0] !== '/') return next.handle(request);

    const modifiedUrl = request.url.replace('/api', 'https://pokeapi.co/api/v2');
    request = request.clone({ url: modifiedUrl });
    return next.handle(request);
  }
}
