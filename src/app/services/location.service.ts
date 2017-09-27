import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';



@Injectable()
export class LocationService {
    constructor(private http: Http) { }

    // api/getAllLoc  ---> Gets all Location Details.  //

    getAll() {
        return this.http.get('http://localhost:56625/api/Dashboard/GetAllLoc', this.jwt()).map((response: Response) => response.json());
    }


    // api/AddLoc ---> Adds a new Location and posts details back. //

    create(loc: Location) {
        return this.http.post('http://localhost:56625/api/Dashboard/AddLoc', loc, this.jwt()).map((response: Response) => response.json());
    }

    // api/EditLoc ---> Update the existing Location details. //

    update(loc: Location) {
        return this.http.put('http://localhost:56625/api/Dashboard/EditLoc', loc, this.jwt()).map((response: Response) => response.json());
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
class Location {
    OrganizationID: number;
    Name: string;
    Address1: string;
    Address2: string;
    CountryID: number;
    StateID: number;
    City: string;
    Zip: string;
    isPrimary: boolean;
    Phone: number;
}