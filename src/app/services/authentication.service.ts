import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { ConfigService } from "./config.service";

 

 
@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private config: ConfigService) { }
 
    submitForm(username: string, password: string) {
        return this.http.post(this.config._apiURI + '/Login', { Email: username, Password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
             localStorage.setItem('user', JSON.stringify(user));
                
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }
    
}
class User{
Email:string;
Password:string;
}