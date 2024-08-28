import {
    CanActivateFn,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';

export const canActivateAuthor: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const role = route.data['chuc_vu'];
    console.log(role);
    const token = localStorage.getItem('token');
    console.log(token);
    let tokenPayload: any;
    if (token) {
        tokenPayload = jwtDecode(token);
        console.log(tokenPayload);
    }
    if (!tokenPayload.role === role) {
        Inject(Router).navigate(['/dang-nhap']);
        return false;
    }
    return true;
};
