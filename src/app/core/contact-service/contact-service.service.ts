import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Messages } from '../../models/messages.model'
import { AuthService } from '../../core/auth-service/auth-service.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

const PATH = 'https://smart-city-lviv.herokuapp.com/api/messages/';

@Injectable()
export class ContactServiceService {
    
    constructor(private http: Http, private auth: AuthService) {
        this.http = http;
    }

    private handleError(error: Response) {
        let errMessage = JSON.parse(error['_body']).errorMessage;
        let message = `Error status ${error.status} at ${error.url}
                   Message: ${errMessage}`;
        return Observable.throw(errMessage);
    }

    getMessages(): Observable<Messages[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.auth.setAuthHeader(headers);
        return this.http.get(PATH, { headers: headers })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    getMessage(id): Observable<Messages> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.auth.setAuthHeader(headers);
        return this.http.get(PATH + id, { headers: headers })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    postMessage(message: any): Observable<Messages> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.auth.setAuthHeader(headers);
        return this.http.post(PATH, message, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    putMessage(id: number, messageEdit): Observable<Messages> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.auth.setAuthHeader(headers);

        return this.http.put(PATH + id, messageEdit, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    deleteMessage(id: number): Observable<Messages> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.auth.setAuthHeader(headers);

        return this.http.delete(PATH + id, { headers: headers })
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };
}