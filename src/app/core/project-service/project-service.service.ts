import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../models/project.model';
import { Subject } from 'rxjs/Subject';
import { AuthService } from "../auth-service/auth-service.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';


const PATH = 'https://smart-city-lviv-api.herokuapp.com/projects/';

@Injectable()
export class ProjectServiceService {

    look: Subject<string> = new Subject<string>();

    constructor(private http: Http,
        private authService: AuthService) { }

    private handleError(error: Response) {
        let errMessage = JSON.parse(error['_body']).errorMessage;
        let message = `Error status ${error.status} at ${error.url}
                       Message: ${errMessage}`;
        return Observable.throw(errMessage);
    }

    getProjects(): Observable<Project[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.authService.setAuthHeader(headers);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(PATH, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    getProject(id): Observable<Project> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.authService.setAuthHeader(headers);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(PATH + id, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    postProject(project: any): Observable<Project> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.authService.setAuthHeader(headers);
        let options = new RequestOptions({ headers: headers });

        return this.http.post(PATH, project, options)
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    putProject(id, projectEdit): Observable<Project> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.authService.setAuthHeader(headers);
        let options = new RequestOptions({ headers: headers });

        return this.http.put(PATH + id, projectEdit, options)
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    deleteProject(id): Observable<Project> {
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.authService.setAuthHeader(headers);
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(PATH + id, options)
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

}