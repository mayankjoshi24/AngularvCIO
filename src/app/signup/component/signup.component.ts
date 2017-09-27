import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { AlertService } from "../../services/alert.service";
import { PasswordValidation } from "./passwordvalidation";
import { ToasterService } from "../../toaster/toaster.service";
import { CountryService } from "../../services/country.service";

const NAME_REGEX = /^[a-zA-Z]+$/;
const NUMBER_REGEX = /^[0-9]+$/;
const PASSWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    model: any = {};
    loading = false;
    countries: Country[];
    states: State[];
    complexForm: FormGroup;



    constructor(fb: FormBuilder,
        private router: Router,
        private _countryService: CountryService,
        private toasterService: ToasterService,
        private userService: UserService,
        private alertService: AlertService
    ) {

        // Get Countries. //

        this._countryService.getCountries().subscribe(country => {
            console.log(country);
            this.countries = country;
        });

        
        this.complexForm = fb.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            'firstName': [null, Validators.compose([Validators.required, Validators.pattern(NAME_REGEX), Validators.minLength(3), Validators.maxLength(20)])],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            'lastName': [null, Validators.compose([Validators.required, Validators.pattern(NAME_REGEX), Validators.minLength(3), Validators.maxLength(20)])],

            'plan': [null, Validators.required],

            'companyName': [null, Validators.compose([Validators.required, Validators.maxLength(20)])],

            'vcioAddress': [null, Validators.required],

            'email': [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],

            'password': ['', Validators.compose([Validators.required, Validators.pattern(PASSWD_REGEX)])],

            'confirmpassword': ['', Validators.compose([Validators.required, Validators.pattern(PASSWD_REGEX)])],

            'billingemail': [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],

            'phonenumber': [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(NUMBER_REGEX)])],

            'address': [null, Validators.compose([Validators.required, Validators.maxLength(50)])],

            'address2': [null, Validators.compose([Validators.required, Validators.maxLength(50)])],

            'country': [null, Validators.required],

            'state': [null, Validators.required],

            'city': [null, Validators.required],

            'postalcode': [null, Validators.compose([Validators.required, Validators.maxLength(12), Validators.pattern(NUMBER_REGEX)])],

            'ccfirstname': [null, Validators.compose([Validators.required, Validators.pattern(NAME_REGEX), Validators.minLength(3), Validators.maxLength(20)])],

            'cclastname': [null, Validators.compose([Validators.required, Validators.pattern(NAME_REGEX), Validators.minLength(3), Validators.maxLength(20)])],

            'CardNo': [null, Validators.compose([Validators.required, Validators.maxLength(16), Validators.pattern(NUMBER_REGEX)])],

            'SecurityCode': [null, Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern(NUMBER_REGEX)])],

            'ExpiryDate': [null, Validators.required],

        },
            {
                validator: PasswordValidation.MatchPassword // your validation method

            }
        )
    }
    ngOnInit() {

    }

    // Function to create a new user. //

    submitForm(model: any) {
        this.loading = true;
        this.userService.create(model)
            .subscribe(
            data => {
                this.toasterService.showToaster('Registration successful');
                this.router.navigate(['/login']);
            },
            error => {
                this.toasterService.showToaster('Please Fill the Required Details..!');
                this.loading = false;
            });
    }

    // Function to fetch particular states residing in a particular country. //

    fetchStates(countryid: any) {
        console.log(countryid);

        this.loading = true;
        //  this._countryService.getStates(countryid).subscribe((state) => {
        this.userService.getById(countryid).subscribe((state) => {
            console.log(state);
            this.states = state.Country.states;
            //console.log(this.states);
        });
    }

    // Function to restrict User from entering characters in the Number only field. //

    _NumberOnly(event: any) {
        const numpattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!numpattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    // Function to let User enter only characters. // 

    _CharacterOnly(event: any) {
        const charpattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!charpattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    // DatePicker Function //

    public isMeeting(date: Date) {
        return /10|15|20/.test(date.getDate() ? 'meeting' : '');
    }


}

interface Country {
    id: number,
    name: string,
    sortname: string
}
interface State {
    id: number,
    name: string,
    countryid: number
}



