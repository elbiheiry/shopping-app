import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { exhaustMap, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor (private authService : AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        
        if (!user) {
          // If no user is logged in, proceed with the original request
          return next.handle(req);
        }
        // If user is logged in, clone the request and add the token
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token ?? '')
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
