import { Component, OnInit, Inject, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AddEvent, EditEvent, GridComponent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs/Rx';
import { Validators, FormBuilder } from '@angular/forms';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent, RowArgs } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { UserService } from "../../services/user.service";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToasterService } from "../../toaster/toaster.service";
import { products } from "../products";
import { OrganisationService } from "../../services/organisation.service";

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
    private gridView: GridDataResult;
    private data: Object[];
    private pageSize: number = 10;
    private skip: number = 0;
    public selecteditem: Observable<Object>;
    private items: any[] = products;
    public info: any[];
    public organisation: any;
    public organisationId: number;
    private selectedKeys: number[] = [5];
    public modalRef: BsModalRef;
    private gridData: any[] = [3];
    private gridDat: GridDataResult
    complexForm: FormGroup;
    constructor(private modalService: BsModalService,
        private orgService: OrganisationService,
        private userService: UserService,
        private toasterService: ToasterService,
        fb: FormBuilder
    ) {
        this.complexForm = fb.group({

            'OrgId': [null, Validators.required],

            'OrgName': [null, Validators.required],

            'ShortName': [null, Validators.required],

            'FirstName': [null, Validators.required],

            'LastName': [null, Validators.required],

            'Description': [null, Validators.required],

            'Email': [null, Validators.required],

            'Phone': [null, Validators.required]
        })

        // Displaying Data into the Contacts Grid. //

        this.loadItems();
        this.userService.getAll().subscribe((data) => {
            console.log(data);
            this.info = data,
                this.gridDat = process(this.info, this.state);
        });
    }



    private rowSelectionKey(context: RowArgs): string {
        // Here you can access the row item (model) from context.dataItem.
        return context.dataItem;
    }


    protected pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadItems();
    }

    public openModal(template: TemplateRef<any>) {
        const selected = this.selectedKeys[1];
        this.organisation = selected;
        console.log(this.organisation);
        this.modalRef = this.modalService.show(template);
    }

    public delete(value: any) {
        console.log(value);
    }

    public openModalforDelete(Deletetemplate: TemplateRef<any>) {
        const selected = this.selectedKeys[1];
        this.organisation = selected;
        console.log(this.organisation);
        this.modalRef = this.modalService.show(Deletetemplate);
    }

    private loadItems(): void {
        this.gridView = {
            data: this.items.slice(this.skip, this.skip + this.pageSize),
            total: this.items.length
        };
    }

    private state: State = {
        skip: 0,
        take: 5
    };

    ngOnInit() {

    }



    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridDat = process(this.info, this.state);
    }

    //  Function to add a new Contact. //

    submitForm(model: any) {
        this.orgService.create(model).subscribe(
            data => {
                this.toasterService.showToaster('Successfully Updated');
                window.location.reload();
            },
            error => {
                this.toasterService.showToaster('Wrong Credential');

            });
    }

    // Function to edit a new Contact. //

    onSave() {
        var model = this.complexForm.value
        this.orgService.update(model).subscribe(
            data => {
                this.toasterService.showToaster('Successfully Updated');
                window.location.reload();
            },
            error => {
                this.toasterService.showToaster('Wrong Credential');
            });
    }




}
