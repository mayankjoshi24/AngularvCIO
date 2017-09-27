import { Component, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { ToasterService } from "../../../toaster/toaster.service";
import { AlertService } from "../../../services/alert.service";
import { OrganisationService } from "../../../services/organisation.service";
import { Router } from "@angular/router";



@Component({
  selector: 'app-addmodal',
  templateUrl: './addmodal.component.html',
  styleUrls: ['./addmodal.component.css']
})
export class AddmodalComponent {
  complexForm: FormGroup;
  model: any = {};
  //@Input() childMessage: string;
  loading = false;
  public modalRef: BsModalRef;
 constructor(fb: FormBuilder,
        private userService: UserService,
        private router:Router,
        
        private toasterService: ToasterService,
        private orgService: OrganisationService,
        private alertService: AlertService,private modalService: BsModalService) {
        this.complexForm = fb.group({
           
           'OrgName' :  [null,Validators.required],

           'ShortName' : [null,Validators.required],

           'FirstName' : [null,Validators.required],

           'LastName' : [null,Validators.required],

           'Description' : [null,Validators.required],

           'Email' : [null,Validators.required],
           
           'Phone' : [null,Validators.required]

        },
          
        )
    }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // Function to Add Organisation //

  submitForm(model: any) {
    this.loading = true;
    this.orgService.create(model).subscribe(
      data => {
        this.toasterService.showToaster('Successfully Added');
        window.location.reload();      },
      error => {
        this.toasterService.showToaster('Already Exist');
        this.loading = false;
      });
  }

  // Function to restrict user from entering anything other than Numbers. //

  _NumberOnly(event: any) {
    const numpattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!numpattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  // Function to restrict user from entering anything other than Characters. //

    _CharacterOnly(event : any) {
       const charpattern = /^[a-zA-Z]+$/;
       let inputChar = String.fromCharCode(event.charCode);

       if(!charpattern.test(inputChar)){
           event.preventDefault();
       }
    }
}
