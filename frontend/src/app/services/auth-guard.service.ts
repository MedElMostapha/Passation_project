import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  this.auth.redirectUrl = state.url;
  if(this.auth.redirectUrl !='/login'){
    console.log(this.auth.redirectUrl)
    localStorage.setItem('url',this.auth.redirectUrl)
    return this.checkConnexion();
  }else {
    window.localStorage.clear()
    return true
  }

}

  checkConnexion(): boolean {

    if (window.localStorage.getItem("token")) {
      return true;
    }
    //this.router.navigate(['login']);
    return false;
  }


  constructor(private auth: AuthenticationService, private router : Router) { }
}
