import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService,
  private router: Router) { }

    logOut() {
      this.authService.logout();
      this.router.navigate(['../../']);
    }

  ngOnInit() {
  }

}
