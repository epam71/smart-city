import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { News } from '../../news/models/news.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NewsServiceService {

  _http;
  look: Subject<string> = new Subject<string>();

  constructor(private http: Http) {
    this._http = http;
  }

  private handlError(error: Response) {
    let message = `Error status ${error.status} at ${error.url}`;
    return Observable.throw(message);
  }

  public getNews(): Observable<any> {
    return this.http.get('https://smart-city-lviv.herokuapp.com/api/news')
      .map((response: Response) => {
        return response.json();
      }).catch(this.handlError);
  };

  getNewsById(id): Observable<any> {
    return this._http.get('https://smart-city-lviv.herokuapp.com/api/news/' + id)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handlError);
  };

  postNews(news: any): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('https://smart-city-lviv.herokuapp.com/api/news', news, { headers: headers })
      .map((response: Response) => {
        return <any>response.json();
      })
      .catch(this.handlError);
  };

  public updateNews(id: number, newsEdit): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put('https://smart-city-lviv.herokuapp.com/api/news/' + id, newsEdit, { headers: headers })
      .catch(this.handlError);
  }

  deleteNews(id: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete('https://smart-city-lviv.herokuapp.com/api/news/' + id, { headers: headers })
      .map((response: Response) => {
        return <any>response.json();
      })
      .catch(this.handlError);
  };

}
