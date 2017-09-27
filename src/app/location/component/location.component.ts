import { Component, OnInit, Inject, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AddEvent, EditEvent, GridComponent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs/Rx';
import { Validators, FormBuilder } from '@angular/forms';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent, RowArgs } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToasterService } from "../../toaster/toaster.service";
 import { LocationService } from "../../services/location.service";
import { products } from "../products";

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent {
    private gridView: GridDataResult;
    private data: Object[];
    private pageSize: number = 10;
    private skip: number = 0;
    public selecteditem: Observable<Object>;
    private items: any[] = products;
    public info: any[];
    public location: any;
    public organisationId: number;
    private selectedKeys: number[] = [5];
    public modalRef: BsModalRef;
    private gridData: any[] = [3];
    private gridDat: GridDataResult
    complexForm: FormGroup;
    constructor(private modalService: BsModalService,
        private locationService: LocationService,
        private toasterService: ToasterService,
        fb: FormBuilder
    ) {
        this.complexForm = fb.group({
            'LocationId' :[null,Validators.required],

            'Name': [null, Validators.required],

            'City': [null, Validators.required],

            'Phone': [null, Validators.required],

            'Zip': [null, Validators.required],

            'Address1': [null, Validators.required],

            'Address2': [null, Validators.required],


        })
        this.loadItems();
        this.locationService.getAll().subscribe((data) => {
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
        this.location = selected;
        console.log(this.location);
        this.modalRef = this.modalService.show(template);
    }

    public delete(value: any) {
        console.log(value);
    }
    public openModalforDelete(Deletetemplate: TemplateRef<any>) {
        const selected = this.selectedKeys[1];
        this.location = selected;
        console.log(this.location);
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
    // t:any;
    ngOnInit() {

    }



    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridDat = process(this.info, this.state);
    }

// Function to Add a new Location //

    submitForm(model: any) {
        this.locationService.create(model).subscribe(
            data => {
                this.toasterService.showToaster('Successfully Added');
                window.location.reload();
            },
            error => {
                this.toasterService.showToaster('Wrong Credential');

            });
    }


// Function to Edit a new Location //

    onSave() {
        var model = this.complexForm.value
        this.locationService.update(model).subscribe(
            data => {
                this.toasterService.showToaster('Successfully Updated');
                window.location.reload();
            },
            error => {
                this.toasterService.showToaster('Wrong Credential');
                
            });
    }

}