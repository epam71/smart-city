import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Headers, 
  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as auth0 from 'auth0-js';

const STORE_KEY_REDIRECT = 'authRedirectTo';
const ROOT_ROLE = 'root';
const INVESTOR_ROLE = 'investor';
const USER_ROLE = 'user'; 
const GUEST_TOKEN = 'guest';
const ACCESS_TOKEN = 'access_token';
const mapKeyToStoreKey = {
  'accessToken': 'access_token',
  'idToken': 'id_token',
  'name': 'user_name',
  'nickname': 'user_nickname',
  'role': 'user_role',
  'email': 'user_email',
  'expireAt': 'user_expireAt'
};
//milliseconds - one day
const EXPIRATION_INTERVAL = ( 24 * 60 * 60 - 1) * 1000; 


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
  private expireAt: number;

  auth0 = new auth0.WebAuth({
    clientID: 'C6LIYADABj55LTJMlwDjjtfb1147MnKi',
    domain: 'smart-city-lviv.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://smart-city-lviv.eu.auth0.com/userinfo',
    redirectUri: `${document.baseURI}auth/callback`,
    scope: 'openid'
  });   

  constructor(private router: Router) {
    this.restoreSession();
    if (this.isExpired()) {
      this.logout();
    }
  }

  isExpired(): boolean {
    return this.expireAt < Date.now();
  }

  isAdmin(): boolean {
    return this.role === ROOT_ROLE && !this.isExpired();
  }

  isInvestor(): boolean {
    return this.role === INVESTOR_ROLE && !this.isExpired();
  }

  isLogedIn(): boolean {
    return this.role !== '' && !this.isExpired();
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
    localStorage.setItem(STORE_KEY_REDIRECT, this.router.url);
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      let pathRedirectTo: string;

      if (err) {
        this.router.navigate(['/']);
        return;
      }
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.name = authResult.idTokenPayload["https://name"];
        this.nickname = authResult.idTokenPayload["https://nickname"];
        this.role = authResult.idTokenPayload["https://role"];
        this.email = authResult.idTokenPayload["https://email"];
        this.expireAt = Date.now() + EXPIRATION_INTERVAL;
        this.setSession();
        this.changeStatus();

        pathRedirectTo = localStorage.getItem(STORE_KEY_REDIRECT);
        if (pathRedirectTo) {
          this.router.navigate([pathRedirectTo]);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }     

  private setSession(): void {
    for ( let prop in mapKeyToStoreKey) {
      localStorage.setItem(mapKeyToStoreKey[prop], this[prop]);
    }  
  }

  private restoreSession(): void {
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

  getEventEmitter(): Observable<string> {
    return this.eventEmmiter.asObservable();
  }

  setAuthHeader(headers:Headers): void {
    let innerToken = this.isLogedIn() ?
      btoa(`${this.email}:${this.accessToken}`) :
      btoa(`${GUEST_TOKEN}:${GUEST_TOKEN}`);

    headers.set('Authorization', `Basic ${innerToken}`);    
  }

  getAuthHeaderOpt(): RequestOptions {
    let headers = new Headers();

    this.setAuthHeader(headers);
    return new RequestOptions({ headers: headers });
  }
}
