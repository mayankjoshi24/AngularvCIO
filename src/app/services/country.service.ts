import {  
    Injectable  
} from '@angular/core';
import { Http,RequestOptions,Response } from "@angular/http";
 
@Injectable()  
export class CountryService {  
     constructor(private http: Http) { }

     // GetCountry ---> Fetches Country Data from Backend. //

    getCountries() {  
return this.http.get('http://localhost:56625/api/Account/GetCountry').map(res => res.json());
    }
   
}
 

   


