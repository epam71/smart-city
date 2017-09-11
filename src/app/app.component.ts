import { Component } from '@angular/core';
import { AuthService } from './core/auth-service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private authService: AuthService) {
    let self = this;

    self['nickname'] = authService.getNickname();
    self['name'] = authService.getName();
    self['email'] = authService.getEmail();
    self['role'] = authService.getRole();

    this.authService.getEventEmitter().subscribe( () => { 
      alert('user status changed')
      self['nickname'] = authService.getNickname();
      self['name'] = authService.getName();
      self['email'] = authService.getEmail();
      self['role'] = authService.getRole();
    });
  }
}
