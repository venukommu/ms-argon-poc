import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder,FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  editForm : FormGroup;
  public userName: any;
  public role: any;
  states: any = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar'];
  cities: any = ['Vijayawada', 'Visakhapatnam', 'Vizianagaram', 'Rajahmundry'];

  constructor(private formBuilder: FormBuilder) { 
    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      professinalStatement: ['', [Validators.required]],
      practicingFrom: ['', [Validators.required]],
      
      // country: ['', [Validators.required, Validators.minLength(3)]],
      // userName: ['', [Validators.required, Validators.minLength(3)]],
      // // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      // email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      
    }); 
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser", currentUser.name)
    this.userName = currentUser.name;
    this.role = currentUser.role;
    //this.adminOfficer = currentUser.username;
  }

  get m(){
    //console.log("controls",this.register.controls);
    return this.editForm.controls;
  }

submitData(){
    if(this.editForm.valid){
    console.log("in submit form")
    }
}  

  ngOnInit(): void {
  }

}
