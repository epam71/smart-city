import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class ProjectServiceService {
    
  _http;
  look: Subject <string> = new Subject <string>();


    constructor(private http: Http) {
        this._http = http;
    }

    private handlError(error: Response) {
        let errMessage = JSON.parse(error['_body']).errorMessage;
        let message = `Error status ${error.status} at ${error.url}
                   Message: ${errMessage}`;
        return Observable.throw(errMessage);
    }

    getProjects(): Observable<any> {
        return this._http.get('https://smart-city-lviv.herokuapp.com/api/projects')
            .map((response: Response) => {
                return response.json();
            }).catch(this.handlError);
    };

    getProject(id): Observable<any> {
        return this._http.get('https://smart-city-lviv.herokuapp.com/api/projects/' + id)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handlError);
    };

    postProject(project: any): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post('https://smart-city-lviv.herokuapp.com/api/projects', project, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handlError);
    };

    putProject(id, projectEdit): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.put('https://smart-city-lviv.herokuapp.com/api/projects/' + id, projectEdit, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handlError);
    };

    patchProject(id, projectEdit): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.patch('https://smart-city-lviv.herokuapp.com/api/projects/' + id, projectEdit, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handlError);
    };

    deleteProject(id: number): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.delete('https://smart-city-lviv.herokuapp.com/api/projects/' + id, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handlError);
    };

}