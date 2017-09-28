import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Reply } from '../../models/reply.model';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { Observable } from 'rxjs/Observable';
import { config } from "../config";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';


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

        return this.http.post(config.PATH + 'notifications/', project, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

}
