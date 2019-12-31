import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../AuthService/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    //console.log("AuthGuard : " + this.authService.isMyTokenExpired());

    if (!this.authService.isAuthenticated()) {
      // Je veux que quand je reload et qu'il a expiré bah ça me redirige login. Marche pas mais ça permet de check le format du JWT
      this.router.navigate(["/login"]);
    }
    return true;
  }
}
