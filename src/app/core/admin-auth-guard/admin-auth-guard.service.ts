import { Injectable } from '@angular/core';
import { CanLoad } from "@angular/router";
import { AuthService } from '../../core/auth-service/auth-service.service';

@Injectable()
export class AdminAuthGuardService implements CanLoad {
  
  canLoad():boolean {
  return this.authService.isAdmin();
  }
    constructor(private authService: AuthService) { }
}
