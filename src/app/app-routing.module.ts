import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/component/login.component";
import { HomeComponent } from "./home/component/home.component";
import { PlansComponent } from "./plans/component/plans.component";
import { SignupComponent } from "./signup/component/signup.component";
import { OrganisationComponent } from "./organisation/component/organisation.component";
import { AuthGuard } from "./authentication/auth.guard";
import { DashboardComponent } from "./dashboard/component/dashboard.component";
import { ContactsComponent } from "./contacts/component/contacts.component";
import { LocationComponent } from "./location/component/location.component";
import { PasswordComponent } from "./password/component/password.component";
import { EmailComponent } from "./email/component/email.component";
import { DashstartComponent } from "./dashstart/component/dashstart.component";





const routes: Routes = [
    {
        path: '', component:HomeComponent
    },
    {
        path: 'home', component:HomeComponent
    },
 
    {
        path:'login', component:LoginComponent
    },

    {
        path:'plans' ,component:PlansComponent
    },

    {
        path:'signup' ,component:SignupComponent
    },
   
    {
        path:'organisation', component:OrganisationComponent,canActivate: [AuthGuard]
    },
    {
        path:'dashboard',component:DashboardComponent
    },
    {
        path:'contacts',component:ContactsComponent
    },
    {
        path:'location',component:LocationComponent
    },
    {
        path:'password',component:PasswordComponent
    },
    {
        path:'email',component:EmailComponent
    },
    {
        path:'dashstart',component:DashstartComponent
    }
   



];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],

})
export class AppRoutingModule {

}