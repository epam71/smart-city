import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http,
  Headers, 
  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as auth0 from 'auth0-js';

const ROOT_ROLE = 'root';
const INVESTOR_ROLE = 'investor';
const USER_ROLE = 'user'; 
const GUEST_TOKEN = 'guest';
const ACCESS_TOKEN = 'access_token'
const mapKeyToStoreKey = {
  'accessToken': 'access_token',
  'idToken': 'id_token',
  'name': 'user_name',
  'nickname': 'user_nickname',
  'role': 'user_role',
  'email': 'user_email',
};


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

  auth0 = new auth0.WebAuth({
    clientID: 'C6LIYADABj55LTJMlwDjjtfb1147MnKi',
    domain: 'smart-city-lviv.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://smart-city-lviv.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/auth/callback',
    scope: 'openid'
  });   

  constructor(private router: Router,
    private http: Http) {
    this.restoreSession();
  }

  isAdmin(): boolean {
    return this.role === ROOT_ROLE;
  }

  isInvestor(): boolean {
    return this.role === INVESTOR_ROLE;
  }

  isLogedIn() {
    return this.role !== '';
  }

  getNickname(): string {
    return this.nickname;
  }

  getName(): string {
    return this.name;
  }

  getRole(): string {
    return this.role;
  }

  getEmail(): string {
    return this.email;
  } 

  getAccesToken(): string {
    return this.accessToken;
  } 

  login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    let selfAuth0 = this.auth0;

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

  private setSession() {
    for ( let prop in mapKeyToStoreKey) {
      localStorage.setItem(mapKeyToStoreKey[prop], this[prop]);
    }  
  }

  private restoreSession() {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      for ( let prop in mapKeyToStoreKey) {
        this[prop] = localStorage.getItem(mapKeyToStoreKey[prop]);
      }
      this.changeStatus();
    }
  }

  logout(): void {
    for ( let prop in mapKeyToStoreKey) {
      this[prop] = '';
      localStorage.removeItem(mapKeyToStoreKey[prop]);
    }
    this.changeStatus();
  }

  private changeStatus(): void {
    this.eventEmmiter.next('');
  }

  getEventEmitter() {
    return this.eventEmmiter.asObservable();
  }

  setAuthHeader(headers:Headers): void {
    let innerToken = this.isLogedIn() ?
      btoa(`${this.email}:${this.accessToken}`) :
      btoa(`${GUEST_TOKEN}:${GUEST_TOKEN}`);

    headers.set('Authorization', `Basic ${innerToken}`);    
  }

  testServerAuth(): void {
    let headers = new Headers();
    this.setAuthHeader(headers);        
    let options = new RequestOptions({ headers: headers });		
    
    this.http.get('https://smart-city-lviv.herokuapp.com/api/projects/59bbd7f67ad34b000481c758', options).subscribe(val => {
      let t = val;
    });
  }
}
