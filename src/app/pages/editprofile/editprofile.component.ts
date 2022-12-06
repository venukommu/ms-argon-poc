import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder,FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { ToolConstService } from "src/app/services/tool-const.service";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  editForm : FormGroup;
  editProviderForm: FormGroup;
  public userName: any;
  public role: any;
  states: any = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar'];
  cities: any = ['Vijayawada', 'Visakhapatnam', 'Vizianagaram', 'Rajahmundry'];
  public userId:any;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,
    private notificationService: NotificationsService,
    private toolConstService: ToolConstService,
    private router: Router) { 
    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      
      // country: ['', [Validators.required, Validators.minLength(3)]],
      // userName: ['', [Validators.required, Validators.minLength(3)]],
      // // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      // email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      
    }); 
    this.editProviderForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      professinalStatement: ['', [Validators.required]],
      practicingFrom: ['', [Validators.required]],          
    }); 
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser", currentUser.name)
    this.userName = currentUser.name;
    this.role = currentUser.role;
    this.userId = currentUser.userId;
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

editPatient() {
  //if (this.editForm.valid) {
    console.log("email", this.editForm.value.firstName);
    console.log("fullName", this.editForm.value.lastName);
    console.log("password", this.editForm.value.middleName);
    //console.log("mobileNumber", this.editForm.value.mobileNumber);
    console.log("Role", this.role);

    const body = {
      first_name: this.editForm.value.firstName,
      last_name: this.editForm.value.lastName,
      middle_name : this.editForm.value.middleName,
      city: this.editForm.value.city,
      state: this.editForm.value.state,
      //phone: this.editForm.value.phone,
      //age: this.editForm.value.age,
      gender: this.editForm.value.gender,
      user_id: this.userId
    };
    console.log("body edit profile", body);
    //this.router.navigateByUrl("/signin");

    this.authService.editPatient(body).subscribe((response) => {
      if (response === "true") {
        this.notificationService.showNotification(
          this.toolConstService.getSuccessMessage().patientInfoUpdated,
          "success"
        );
      } else {
        this.notificationService.showNotification(
          response['status'],
          "danger"
        );
      }
    });
  //}
}

editProvider() {
  //if (this.editProviderForm.valid) {
    console.log("email", this.editProviderForm.value.firstName);
    console.log("fullName", this.editProviderForm.value.lastName);
    console.log("password", this.editProviderForm.value.middleName);
    //console.log("mobileNumber", this.editForm.value.mobileNumber);
    console.log("Role", this.role);

    const body = {
      first_name: this.editProviderForm.value.firstName,
      last_name: this.editProviderForm.value.lastName,
      city: this.editProviderForm.value.city,
      state: this.editProviderForm.value.state,
      //phone: this.editForm.value.phone,
      age: this.editProviderForm.value.age,
      gender: this.editProviderForm.value.gender,
      user_id: this.userId
    };
    console.log("body edit profile", body);

    this.authService.editProvider(body).subscribe((response) => {
      if (response === "true") {
        this.notificationService.showNotification(
          this.toolConstService.getSuccessMessage().patientInfoUpdated,
          "success"
        );
      } else {
        this.notificationService.showNotification(
          response['status'],
          "danger"
        );
      }
    });
  //}
}

  ngOnInit(): void {
  }

}
