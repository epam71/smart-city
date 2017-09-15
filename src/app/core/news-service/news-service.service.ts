import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {News} from '../../news/models/news.model'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/do';

@Injectable()
export class NewsServiceService {
 
  constructor(private http: Http) {
    
  }

  private handlError(error: Response){
    let message = `Error status ${error.status} at ${error.url}`;
    return Observable.throw(message);
}
 
public getNews(): Observable<any> {
  return this.http.get('https://smart-city-lviv.herokuapp.com/api/news')
  .map((response: Response) => {
      return response.json();
  }).catch(this.handlError);
};

postNews(news: any): Observable<any> {
  const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.post('https://smart-city-lviv.herokuapp.com/api/news', news, {headers: headers})
  .map((response: Response) => {
      return <any>response.json();
  })
  .catch(this.handlError);
};

public updateNews (id:number): Observable<News> {
  const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.put('https://smart-city-lviv.herokuapp.com/api/news/' + id, {headers: headers}) 
    .catch(this.handlError);
}

deleteNews(id: number): Observable<any> {
  const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.delete('https://smart-city-lviv.herokuapp.com/api/news/' + id, {headers: headers})
  .map((response: Response) => {
      return <any>response.json();
  })
  .catch(this.handlError);
};

}
