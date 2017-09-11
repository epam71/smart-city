import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as auth0 from 'auth0-js';
//--------------------------------------------------------------------------------
const rootRole = 'root';
const investorRole = 'investor';
const userRole = 'user'; 
//--------------------------------------------------------------------------------
@Injectable()
export class AuthService {

  private eventEmmiter: Subject<string> = new Subject<string>();
  private name: string = '';
  private nickname: string = '';
  private email: string = '';
  private picture: string = '';
  private role: string = '';
  private idToken: string = '';
  private accessToken: string = '';
  //--------------------------------------------------------------------------------  
  auth0 = new auth0.WebAuth({
    clientID: 'C6LIYADABj55LTJMlwDjjtfb1147MnKi',
    domain: 'smart-city-lviv.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://smart-city-lviv.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/auth/callback',
    scope: 'openid'
  });   
  //--------------------------------------------------------------------------------  
  constructor(private router: Router) {
    this.restoreSession();
  }
  //--------------------------------------------------------------------------------  
  isAdmin(): boolean {
    return this.role === rootRole;
  }
  //--------------------------------------------------------------------------------  
  isInvestor(): boolean {
    return this.role === investorRole;
  }
  //--------------------------------------------------------------------------------
  isLogedIn() {
    return this.role !== '';
  }
  //--------------------------------------------------------------------------------
  getNickname(): string {
    return this.nickname;
  }
  //--------------------------------------------------------------------------------
  getName(): string {
    return this.name;
  }
  //--------------------------------------------------------------------------------
  getRole(): string {
    return this.role;
  }
  //--------------------------------------------------------------------------------
  getEmail(): string {
    return this.email;
  } 
  //-----------------------------------------------------------------------------
  login(): void {
    this.auth0.authorize();
  }
  //-----------------------------------------------------------------------------
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (err) {
        this.router.navigate(['/comp2']);
        console.log(err);
        return;
      }
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.name = authResult.idTokenPayload["https://name"];
        this.nickname = authResult.idTokenPayload["https://nickname"];
        this.role = authResult.idTokenPayload["https://role"];
        this.email = authResult.idTokenPayload["https://email"];
        this.setSession();
        this.changeStatus();
      }
    });
  }     
  //-----------------------------------------------------------------------------  
  private setSession() {
    localStorage.setItem('access_token', this.accessToken);
    localStorage.setItem('id_token', this.idToken);
    localStorage.setItem('user_name', this.name);
    localStorage.setItem('user_nickname', this.nickname);
    localStorage.setItem('user_role', this.role);
    localStorage.setItem('user_email', this.email);
  }
  //-----------------------------------------------------------------------------  
  private restoreSession() {
    let access_token = localStorage.getItem('access_token');

    if (access_token) {
      this.accessToken = access_token;
      this.idToken = localStorage.getItem('id_token');
      this.name = localStorage.getItem('user_name');
      this.nickname = localStorage.getItem('user_nickname');
      this.role = localStorage.getItem('user_role');
      this.email = localStorage.getItem('user_email');
      this.changeStatus();
    }
  }
  //-----------------------------------------------------------------------------  
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_nickname');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    this.name = '';
    this.nickname = '';
    this.role = '';
    this.email = '';
    this.changeStatus();
  }
  //-----------------------------------------------------------------------------  
  private changeStatus() {
    this.eventEmmiter.next('');
  }
  //-----------------------------------------------------------------------------  
  getEventEmitter() {
    return this.eventEmmiter.asObservable();
  }
  //-----------------------------------------------------------------------------  
}
