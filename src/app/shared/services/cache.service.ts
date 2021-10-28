import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';


abstract class HttpCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | null;
  abstract put(req: HttpRequest<any>, res: HttpResponse<any> | null): void;

}

@Injectable({
  providedIn: 'root'
})
export class CacheService implements HttpCache {

  private cache: any = {};

  constructor() { }

  put(req: HttpRequest<any>, res: HttpResponse<any> | null): void {
    this.cache[req.urlWithParams] = res;
  }

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    return this.cache[req.urlWithParams];
  }

  getCache(req: HttpRequest<any>): HttpResponse<any> | null {
    return this.cache[req.urlWithParams];
  }

  setCache(req: HttpRequest<any>, res: HttpResponse<any> | null): void {
    this.cache[req.urlWithParams] = res;
  }



}
