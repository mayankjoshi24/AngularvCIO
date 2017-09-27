import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, Validators,  FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { AlertService } from "../../services/alert.service";
import { ToasterService } from "../../toaster/toaster.service";


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    complexForm: FormGroup;
    model: any = {};
    loading = false;
    returnUrl: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toasterService: ToasterService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        fb: FormBuilder) {
        this.complexForm = fb.group({
            'subdomain': [null, Validators.required],
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            'username': [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            'password': [null, Validators.compose([Validators.required, Validators.pattern(PASSWD_REGEX)])],
        })
    }


    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['organisation'] || '/organisation';
    }

    // Function to submit and authenticate Login Details //

    submitForm(model: any) {

        this.loading = true;
        this.authenticationService.submitForm(model.username, model.password)
            .subscribe(
            data => {
                this.toasterService.showToaster('Login successful');
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.toasterService.showToaster('Wrong  credential');
                this.loading = false;
            });
    }
}

