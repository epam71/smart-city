import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Messages } from '../../models/messages.model'
import { AuthService } from '../../core/auth-service/auth-service.service';
import { config } from "../config";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

@Injectable()
export class ContactServiceService {
    
    constructor(private http: Http, private auth: AuthService) { }

    private handleError(error: Response) {
        let errMessage = JSON.parse(error['_body']).errorMessage;
        let message = `Error status ${error.status} at ${error.url}
                   Message: ${errMessage}`;
        return Observable.throw(errMessage);
    }

    getMessages(): Observable<Messages[]> {

        return this.http.get(config.PATH + 'messages/', this.auth.getAuthHeaderOpt())
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    getMessage(id): Observable<Messages> {

        return this.http.get(config.PATH + 'messages/' + id, this.auth.getAuthHeaderOpt())
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    postMessage(message: any): Observable<Messages> {

        return this.http.post(config.PATH + 'messages/', message, this.auth.getAuthHeaderOpt())
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    getMessagesNumber(): Observable<any> {

        return this.http.get(config.PATH + 'messages/' + 'count/', this.auth.getAuthHeaderOpt())
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    putMessage(id: number, messageEdit): Observable<Messages> {

        return this.http.put(config.PATH + 'messages/' + id, messageEdit, this.auth.getAuthHeaderOpt())
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    deleteMessage(id): Observable<Messages> {        

        return this.http.delete(config.PATH + 'messages/' + id, this.auth.getAuthHeaderOpt())
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };
}