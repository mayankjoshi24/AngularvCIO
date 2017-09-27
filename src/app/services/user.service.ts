import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';



@Injectable()
export class UserService {
    constructor(private http: Http) { }


    //  getAllOrg ---> Gets Organisation details. //

    getAll() {
        return this.http.get('http://localhost:56625/api/Organisations/GetAllOrg', this.jwt()).map((response: Response) => response.json());
    }

    // GetOrganisation --->  Gets Organisation details according to a particular Id. //

    getByOrgId(id: any) {
        return this.http.get('http://localhost:56625/api/Account/GetOrganisation/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // GetStates ---> Gets States according to the selected country. //

    getById(id: number) {
        return this.http.get('http://localhost:56625/api/Account/GetStates/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // Register ---> Registers a new user details. //

    create(user: User) {
        return this.http.post('http://localhost:56625/api/Account/Register', user, this.jwt()).map((response: Response) => response.json());
    }

    // EditOrg ---> Edits details of an existing Organisation. //

    update(org: Organisation) {
        return this.http.put('http://localhost:56625/api/Organisations/EditOrg', org, this.jwt()).map((response: Response) => response.json());
    }

    // delete ---> Removes an Organisation Details. //

    delete(id: number) {
        return this.http.delete('http://localhost:55278/api' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}
class Organisation {
    id: number;
    orgName: string;
    shortName: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    description: string
}