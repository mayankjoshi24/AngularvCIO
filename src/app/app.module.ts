import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdFormFieldModule, MdInputModule, MdButtonModule, MdCheckboxModule, MdDatepickerModule, MaterialModule, MdListModule, MdCardModule, MdNativeDateModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { FooterComponent } from "./shared/footer/component/footer.component";
import { HeaderComponent } from "./shared/header/component/header.component";
import { LoginComponent } from "./login/component/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/component/home.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { PlansComponent } from "./plans/component/plans.component";
import { SignupComponent } from "./signup/component/signup.component";
import { HttpModule } from "@angular/http";
import { DateInputsModule, DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { ConfigService } from "./services/config.service";
import { AlertService } from "./services/alert.service";
import { AuthenticationService } from "./services/authentication.service";
import { UserService } from "./services/user.service";
import { OrganisationComponent } from "./organisation/component/organisation.component";
import { GridModule } from '@progress/kendo-angular-grid';
import { DashboardlayoutComponent } from "./dashboardlayout/component/dashboardlayout.component";
import { ToasterService } from "./toaster/toaster.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CountryService } from "./services/country.service";
import { AuthGuard } from "./authentication/auth.guard";
import { AddmodalComponent } from "./organisation/addmodel/component/addmodal.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { OrganisationService } from "./services/organisation.service";
import { DashboardComponent } from "./dashboard/component/dashboard.component";
import { CarouselModule } from 'ngx-bootstrap';
import { ContactsComponent } from "./contacts/component/contacts.component";
import { LocationComponent } from "./location/component/location.component";
import { PasswordComponent } from "./password/component/password.component";
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { EmailComponent } from "./email/component/email.component";
import { LocationService } from "./services/location.service";
import { AddlocationmodalComponent } from "./location/addlocationmodal/addlocationmodal.component";
import { AddcontactsmodalComponent } from "./contacts/addcontactsmodal/addcontactsmodal.component";
import { PasswordService } from "./services/password.service";
import { DashstartComponent } from "./dashstart/component/dashstart.component";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    PlansComponent,
    SignupComponent,
    OrganisationComponent,
    DashboardlayoutComponent,
    AddmodalComponent,
    DashboardComponent,
    ContactsComponent,
    LocationComponent,
    PasswordComponent,
    EmailComponent,
    AddlocationmodalComponent,
    AddcontactsmodalComponent,
    DashstartComponent

    
  ],
  imports: [
    BrowserModule,
     MdFormFieldModule,
     MdInputModule,
     MdButtonModule,
     MdCheckboxModule,
     FormsModule,
     ReactiveFormsModule,
     MaterialModule,
     RouterModule,
     AppRoutingModule,
     MdListModule,
     MdCardModule,
     MdDatepickerModule,
     MdNativeDateModule,
     HttpModule,
     DatePickerModule,
     GridModule,
     BrowserAnimationsModule,
     ModalModule.forRoot(),
     ShowHidePasswordModule.forRoot(),
     CarouselModule.forRoot()
     
     

   
  ],
  providers: [ 
        ConfigService,
        ToasterService,
        UserService,
        CountryService,
        AuthGuard,
        AlertService,
        AuthenticationService,
        OrganisationService,
        LocationService,
        PasswordService
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
