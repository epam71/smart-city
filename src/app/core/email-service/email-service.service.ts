import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Reply } from '../../models/reply.model';
import { AuthService } from "../auth-service/auth-service.service";
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';


const PATH = 'https://smart-city-lviv-api.herokuapp.com/notifications/';
@Injectable()
export class EmailServiceService {

  constructor(private http: Http,
        private authService: AuthService) { }
      
    private handleError(error: Response) {
        let errMessage = JSON.parse(error['_body']).errorMessage;
        let message = `Error status ${error.status} at ${error.url}
                       Message: ${errMessage}`;
        return Observable.throw(errMessage);
    }

    postEmail(project: any): Observable<Reply> {

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

}
