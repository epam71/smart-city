import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Http,
  Headers, 
  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as auth0 from 'auth0-js';
import { config } from "../config";

const USER_INFO_URL = 'https://smart-city-lviv.eu.auth0.com/userinfo';
const STORE_KEY_REDIRECT = 'authRedirectTo';
const ROOT_ROLE = 'root';
const INVESTOR_ROLE = 'investor';
const USER_ROLE = 'user'; 
const GUEST_TOKEN = 'guest';
const ACCESS_TOKEN = 'access_token';
const mapKeyToStoreKey = {
  'accessToken': 'access_token',
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

  constructor(
    private router: Router,
    private http: Http
    ) {
    this.restoreSession();
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

  fillUserInfo(authResult: any) {
    this.name = authResult["https://name"];
    this.nickname = authResult["https://nickname"];
    this.role = authResult["https://role"];
    this.email = authResult["https://email"];
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
        this.fillUserInfo(authResult.idTokenPayload);
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
    localStorage.setItem(mapKeyToStoreKey['accessToken'], this.encryptToken(this['accessToken']));
    localStorage.setItem(mapKeyToStoreKey['expireAt'], '' + this['expireAt']);
  }

  private restoreSession(): void {
    let tempAccessToken = this.decryptToken(localStorage.getItem(mapKeyToStoreKey['accessToken']));
    let headers = new Headers();
    let options;

    this.expireAt = +localStorage.getItem(mapKeyToStoreKey['expireAt']);
    if (tempAccessToken && !this.isExpired()) {
      headers.set( 'Authorization', `Bearer ${tempAccessToken}`);
      options = new RequestOptions({ headers: headers });
      this.http.get(USER_INFO_URL, options)
        .catch( (err: Response) => {
          this.cleanLocalStorage();
          return Observable.throw(err);
        } )      
        .subscribe(
          response => {
            try {
              let userInfo = JSON.parse(response._body);

              if (userInfo['https://role']) {
                this.accessToken = tempAccessToken;
                this.fillUserInfo(userInfo);
                this.changeStatus();  
              }
            } catch (err) {
              //autologin data corrupted
              this.cleanLocalStorage();
            }          
          }
        );
    }
  }

  cleanLocalStorage() {
    for ( let prop in mapKeyToStoreKey) {
      this[prop] = '';
      localStorage.removeItem(mapKeyToStoreKey[prop]);
    }
  }

  logout(): void {
    this.cleanLocalStorage();
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

  getUserCount(): Observable<any> {
    return this.http.get(`${config.PATH}users`, this.getAuthHeaderOpt());
  }

  encryptToken(token): string {
    return btoa(token);
  }

  decryptToken(encToken): string {
    let res;
    try {
      res = encToken ? atob(encToken): '';
    } catch(err) {
      res = '';
    }  
    return res;
  }
}
