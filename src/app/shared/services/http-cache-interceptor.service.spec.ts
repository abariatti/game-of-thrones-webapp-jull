import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpCacheInterceptorService } from './http-cache-interceptor.service';

describe('HttpInterceptorService', () => {
  let service: HttpCacheInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpCacheInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
