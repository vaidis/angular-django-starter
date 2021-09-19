import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,     // get signedin value
    private router: Router                // redirect on deny
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    sstate: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null), // skip null default value
      take(1),                            // mark as complete after 1 value
      tap(authenticated => {
        if (!authenticated) {             // if not logged in
          this.router.navigateByUrl('/'); //redirect to front
        }
      })
    );
  }
}
