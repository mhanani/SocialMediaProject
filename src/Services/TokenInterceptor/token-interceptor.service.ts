import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "../AuthService/auth.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
// Cette classe est appelée automatiquement
export class TokenInterceptorService implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  /// The goal is to include the JWT which is in local storage as the Authorization header in any HTTP request that is sent. The first step is to create an interceptor. To do this, create an Injectable class which implements HttpInterceptor.

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Using interceptors is all about changing outgoing requests and incoming responses, but we can’t tamper with the original request–it needs to be immutable. To make changes we need to clone the original request.

    if (this.auth.getToken()) {
      request = request.clone({
        // When we clone we setHeaders
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }
    //Calling next.handle means that we are passing control to the next interceptor in the chain, if there is one.
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            //window.location.href = "http://localhost:4200/navbar";
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            // Redirect login because token expired
            console.log("Token expired");
            //window.location.href = "http://localhost:4200/login";
          }
        }
      )
    );
  }
}
