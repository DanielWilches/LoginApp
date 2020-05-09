import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private Auth: AuthService, private router: Router ){}
  canActivate(): boolean {
    if ( this.Auth.estaAutenticado() ) {
      return true;
    }else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
