import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { News } from '../../models/news.model';
import { Subject } from 'rxjs/Subject';
import { AuthService } from "../auth-service/auth-service.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


const HTTP_NEWS = 'https://smart-city-lviv-api.herokuapp.com/news/';
const headers = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export class NewsServiceService {

 
  look: Subject<string> = new Subject<string>();
 
  constructor(private http: Http, 
    private authService: AuthService) {
   
  }

  private handlError(error: Response){
   

    let errorMessage = JSON.parse(error['_body']).errorMessage;
    let message = `Error status ${error.status} at ${error.url}`;         
    return Observable.throw(errorMessage);
  }
 
 getNews(): Observable<News[]> {
    this.authService.setAuthHeader(headers);
    return this.http.get(HTTP_NEWS, 
      new RequestOptions({ headers: headers }))
      .map((response: Response) => {
        return response.json();
      }).catch(this.handlError);
  };

  postNews(news: any): Observable<News> {
    this.authService.setAuthHeader(headers);
    return this.http.post(HTTP_NEWS, news, 
      new RequestOptions({ headers: headers }))
      .map((response: Response) => {
        return <any>response.json();
      })
      .catch(this.handlError);
  };

  getNewsById (id): Observable<News> {
    this.authService.setAuthHeader(headers);
    return this.http.get(HTTP_NEWS +id, 
     new RequestOptions({ headers: headers }))
      .map((response: Response) => {
          return response.json();
      }).catch(this.handlError);
  };

  updateNews (id, newsEdit): Observable<News> {
    this.authService.setAuthHeader(headers);
    return this.http.put(HTTP_NEWS + id, newsEdit, 
      new RequestOptions({ headers: headers })) 
    .catch(this.handlError);
  };

  deleteNews(id): Observable<News> {
    this.authService.setAuthHeader(headers);
    return this.http.delete(HTTP_NEWS + id, 
      new RequestOptions({ headers: headers }))
      .map((response: Response) => {
        return <any>response.json();
      })
      .catch(this.handlError);
  };

  postNewsLike(id, user): Observable<News> {
    this.authService.setAuthHeader(headers);
    return this.http.post(HTTP_NEWS + id + '/likes', user, 
      new RequestOptions({ headers: headers }))
      .map((response: Response) => {
          return <any>response.json();
      }).catch(this.handlError);
  };

  postComment(id, message: any): Observable<News> {
    this.authService.setAuthHeader(headers);
    return this.http.post(HTTP_NEWS + id + '/comments', message, 
    new RequestOptions({ headers: headers }))
      .map((response: Response) => {
          return <any>response.json();
      })
      .catch(this.handlError);
  };



}
