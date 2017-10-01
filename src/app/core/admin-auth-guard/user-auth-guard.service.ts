import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../core/auth-service/auth-service.service';

@Injectable()
export class UserAuthGuardService implements CanActivate {
  
  canActivate():boolean {
  return this.authService.isLogedIn();
  }
    constructor(private authService: AuthService) { }
}
