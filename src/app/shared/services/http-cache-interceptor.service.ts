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
    console.log("INTERCEPTOR HOOKED IN");
    const cachedResponse = this.cacheService.getCache(req) || null;
    if (cachedResponse) {
      console.log("response from cache!");
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.setCache(req, event);
          console.log("response from server");
        }
      })
    )
  }
}