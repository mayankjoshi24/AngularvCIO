import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';



@Injectable()
export class OrganisationService {
    constructor(private http: Http) { }

    // api/getAllOrg  ---> Gets all Organisation Details.  //

    getAll() {
        return this.http.get('http://localhost:56625/api/Organisations/GetAllOrg', this.jwt()).map((response: Response) => response.json());
    }


    // api/AddOrg ---> Adds a new Organisation and posts details back. //

    create(org: Organisation) {
        return this.http.post('http://localhost:56625/api/Organisations/AddOrg', org, this.jwt()).map((response: Response) => response.json());
    }

    // api/EditOrg ---> Update the existing Organisation details. //

    update(org:Organisation){
         return this.http.put('http://localhost:56625/api/Organisations/EditOrg', org, this.jwt()).map((response: Response) => response.json());
    }
  

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
class Organisation {
    OrgName : string;
    ShortName : string;
    FirstName : string;
    LastName : string;
    Description :string;
    Email : string;
    Phone : number;
}