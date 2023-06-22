import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from '../admin-board/admin.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public adminService: AdminService, public router: Router) {}
  canActivate(): boolean {
    if (!this.adminService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
