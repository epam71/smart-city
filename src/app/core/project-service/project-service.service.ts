import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProjectServiceService {
  _http;

  constructor(private http: Http) {
    this._http = http;
  }

  getProjects(): Observable<any> {
    return this._http.get('https://smart-city-lviv.herokuapp.com/api/users/')
        .map((response: Response) => {
            console.log('sadsafsa');
            console.log(response.json());
            return response.json();
        }).catch(error => {
            console.log(error)
            return error;
        });
};

getProject(id): Observable<any> {
  return this._http.get('https://smart-city-lviv.herokuapp.com/api/users/'+id)
      .map((response: Response) => {
          console.log('sadsafsa');
          console.log(response.json());
          return response.json();
      }).catch(error => {
          console.log(error)
          return error;
      });
};

postProject(project: any): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('https://cool-6d724.firebaseio.com/data.json', project, {headers: headers})
    .map((response: Response) => {
        console.log(response.json())
        return <any>response.json();
    })
    .catch(error => {
        console.log(error)
        return error;
    });
};




putProject(id, projectEdit): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.put('https://smart-city-lviv.herokuapp.com/api/users/' + id, projectEdit, {headers: headers})
    .map((response: Response) => {
        console.log(response.json())
        return <any>response.json();
    })
    .catch(error => {
        console.log(error)
        return error;
    });
};

deleteProject(id: number): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete('https://cool-6d724.firebaseio.com/data/data/' + id, {headers: headers})
    .map((response: Response) => {
        console.log(response.json())
        return <any>response.json();
    })
    .catch(error => {
        console.log(error);
        return error;
    });
};

}
