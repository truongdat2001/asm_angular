import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Inject } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { jwtDecode } from "jwt-decode";

export const canActivateTeam: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const token: any = localStorage.getItem("token");
    // console.log(token);
    if (token) {
        const jwtHelper = new JwtHelperService();
        if (!jwtHelper.isTokenExpired(token)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
