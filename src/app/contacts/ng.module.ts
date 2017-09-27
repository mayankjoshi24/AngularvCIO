import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { ContactsComponent } from "./component/contacts.component";





@NgModule({
  imports:      [  BrowserModule,
        BrowserAnimationsModule,ReactiveFormsModule,
        GridModule,
        DropDownListModule],
   
  declarations: [ ContactsComponent],
  
  bootstrap:    [ ContactsComponent ]

})

export class AppModule { }
