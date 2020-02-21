import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()

export class GuestService {

    constructor(
        private http: HttpClient
    ) { }

    user_sign_up(data) {
        return this.http.post(environment.apiUrl + 'user-sign-up', data).pipe(timeout(10000));
    }

    user_login(data) {
        return this.http.post(environment.apiUrl + 'user-login', data).pipe(timeout(10000));
    }

}