import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.currentUser.isLoggedIn) {
      console.log("authguard: user is logged in!");

      return true;
    } else {
      console.log("authguard: user is NOT logged in!");

      this.router.navigate(["/auth/login"]);
      return false;
    }
  }
}