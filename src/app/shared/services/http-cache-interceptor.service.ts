import { map, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpCacheInterceptorService implements HttpInterceptor {

  constructor(private cacheService: CacheService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const cachedResponse = this.cacheService.getCache(req) || null;
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.setCache(req, event);
        }
      })
    )
  }
}