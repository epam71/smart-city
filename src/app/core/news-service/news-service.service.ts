import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { News } from '../../models/news.model';
import { Subject } from 'rxjs/Subject';
import { AuthService } from "../auth-service/auth-service.service";
import { config } from "../config";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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

  getNewsBlock(): Observable<News[]> {
    return this.http.get(config.PATH + 'news/' + '?query={"approved":"false"}&limit=3', 
     this.authService.getAuthHeaderOpt())
      .map((response: Response) => {
        return response.json();
      }).catch(this.handlError);
  };
 
 getNews(): Observable<News[]> {
    return this.http.get(config.PATH + 'news/' , 
    this.authService.getAuthHeaderOpt())
      .map((response: Response) => {
        return response.json();
      }).catch(this.handlError);
  };

  postNews(news: any): Observable<News> {
    return this.http.post(config.PATH + 'news/', news, 
    this.authService.getAuthHeaderOpt())
      .map((response: Response) => {
        return <any>response.json();
      })
      .catch(this.handlError);
  };

  getNewsById (id): Observable<News> {
    return this.http.get(config.PATH + 'news/' +id, 
      this.authService.getAuthHeaderOpt())
      .map((response: Response) => {
          return response.json();
      }).catch(this.handlError);
  };

  getNewsShort(): Observable<any> {
    return this.http.get(config.PATH + 'news/' + '?select=title,_id,approved', 
    this.authService.getAuthHeaderOpt())
      .map((response: Response) => {
        return response.json();
      }).catch(this.handlError);
  };

  getNewsNumber(): Observable<any> {
    return this.http.get(config.PATH + 'news/' + 'count', 
    this.authService.getAuthHeaderOpt())
      .map((response: Response) => {
        return response.json();
      }).catch(this.handlError);
  };

  updateNews(id, newsEdit): Observable<News> {
    return this.http.put(config.PATH + 'news/' + id, newsEdit,
    this.authService.getAuthHeaderOpt())
    .map((response: Response) => {
      return response.json();
    })
      .catch(this.handlError);
  };

  deleteNews(id): Observable<News> {
    return this.http.delete(config.PATH + 'news/' + id,
    this.authService.getAuthHeaderOpt())
      .map((response: Response) => {
        return <any>response.json();
      })
      .catch(this.handlError);
  };

  postNewsLike(id, user:any): Observable<News> {
    return this.http.post(config.PATH + 'news/' + id + '/likes', user, 
    this.authService.getAuthHeaderOpt())
      .map((response: Response) => {
          return <any>response.json();
      }).catch(this.handlError);
  };

  postComment(id, message: any): Observable<News> {
    return this.http.post(config.PATH + 'news/' + id + '/comments', message, 
    this.authService.getAuthHeaderOpt())
      .map((response: Response) => {
          return <any>response.json();
      })
      .catch(this.handlError);
  };

  deleteComment(id, commentId): Observable<News> {
    return this.http.delete(config.PATH + 'news/' + id + '/comments/' + commentId, 
    this.authService.getAuthHeaderOpt())
      .map((response: Response) => {
        return <any>response.json();
      })
      .catch(this.handlError);
  };

}
