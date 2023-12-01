import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  private readonly _apiUrl = 'https://beta.pokeapi.co/graphql/v1beta';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url[0] !== '/') return next.handle(request);

    const modifiedUrl = request.url.replace('/pokemon', this._apiUrl);
    request = request.clone({ url: modifiedUrl });
    return next.handle(request);
  }
}