import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.reducer';
//import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService, 
                private router: Router,
                private store: Store<AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        return this.store.select('auth').subscribe( isAuth => {
            console.log(isAuth);
        });
        // if (this.authService.isAuth()) {
        //     return true;
        // } else {
        //     this.router.navigate(['/login']);
        // }
    }

    canLoad(route: Route, segments: UrlSegment[]): any {
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }        
    }

}