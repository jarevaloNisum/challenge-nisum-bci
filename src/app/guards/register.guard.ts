import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.params['token'] !== '123') {
      this.router.navigate(['home']);
      alert('Invalid token');
      return false;
    }
    return true;
  }
}
