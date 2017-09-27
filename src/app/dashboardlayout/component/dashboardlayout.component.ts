import { Component } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector:'app-dashlayout',
    templateUrl:'./dashboardlayout.component.html',
    styleUrls:['./dashboardlayout.component.css']
})
export class DashboardlayoutComponent{

 constructor(

        private authenticationService: AuthenticationService){}


        logOut()
        {
            this.authenticationService.logout();
        }
}