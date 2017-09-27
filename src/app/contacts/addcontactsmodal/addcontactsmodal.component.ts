import { Component, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";
import { LocationService } from "../../services/location.service";
import { ToasterService } from "../../toaster/toaster.service";
import { UserService } from "../../services/user.service";
import { CountryService } from "../../services/country.service";


@Component({
    selector:'app-addcontactsmodal',
    templateUrl:'./addcontactsmodal.component.html',
    styleUrls:['./addcontactsmodal.component.css']
})
export class AddcontactsmodalComponent{
complexForm: FormGroup;
    model: any = {};
    loading = false;
    public modalRef: BsModalRef;
    constructor(fb: FormBuilder,

        private router: Router,
        private locationService: LocationService,
        private toasterService: ToasterService,
        private userService: UserService,
        private _countryService: CountryService,
        private alertService: AlertService, private modalService: BsModalService) {

        {
            this.complexForm = fb.group({

                'FirstName': [null, Validators.required],

                'LastName': [null, Validators.required],

                'Title': [null, Validators.required],

                'Zip': [null, Validators.required],

                'Address1': [null, Validators.required],

                'Address2': [null, Validators.required],

                'country': [null, Validators.required],

                'state': [null, Validators.required]

            },

            )
        }
    }

    // Open Modal //

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    // Add New Location //

    submitForm(model: any) {
        this.loading = true;
        this.locationService.create(model).subscribe(
            data => {
                this.toasterService.showToaster('Successfully Added');
                window.location.reload();
            },
            error => {
                this.toasterService.showToaster('Already Exist');
                this.loading = false;
            });
    }

    //  Function to restrict users enter anything other than numbers in the text field. //

    _NumberOnly(event: any) {
        const numpattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!numpattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    // Function to restrict users enter anything other than characters in the text field. //

    _CharacterOnly(event: any) {
        const charpattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!charpattern.test(inputChar)) {
            event.preventDefault();
        }
    }



    
}