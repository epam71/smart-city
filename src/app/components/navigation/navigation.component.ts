import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy{
private adminRole: boolean;
private subscription: any;
private adminRoute: boolean;
log;

  constructor(private authService: AuthService, private router: Router) {
    router.events
    .filter(event => event instanceof NavigationStart)
    .subscribe((event:NavigationStart) => {
      this.adminRoute = (event.url.substring(0,6) == "/admin") ? true : false;
    });
  }

  ngOnInit() {
    this.log = this.authService.isLogedIn();
    this.adminRole = this.authService.isAdmin();
    this.subscription = this.authService.getEventEmitter()
    .subscribe(() =>
        this.adminRole = this.authService.isAdmin()
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    
  }

}
