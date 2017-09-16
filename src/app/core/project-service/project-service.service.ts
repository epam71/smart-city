import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../projects/models/project.model';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';


const PATH = 'https://smart-city-lviv.herokuapp.com/api/projects/';

@Injectable()
export class ProjectServiceService {

    look: Subject<string> = new Subject<string>();

    constructor(private http: Http) {}

    private handleError(error: Response) {
        let errMessage = JSON.parse(error['_body']).errorMessage;
        let message = `Error status ${error.status} at ${error.url}
                       Message: ${errMessage}`;
        return Observable.throw(errMessage);
    }

    getProjects(): Observable<Project[]> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(PATH, {headers: headers})
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    getProject(id): Observable<Project> {
        return this.http.get(PATH + id)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    postProject(project: any): Observable<Project> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(PATH, project, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    putProject(id, projectEdit): Observable<Project> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(PATH + id, projectEdit, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    patchProject(id, projectEdit): Observable<Project> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.patch(PATH + id, projectEdit, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    deleteProject(id): Observable<Project> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.delete(PATH + id, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

}