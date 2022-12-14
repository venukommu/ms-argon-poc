import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder,FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { ToolConstService } from "src/app/services/tool-const.service";
import { WhitespaceValidator } from 'src/app/services/validators/whitespace.validator';

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
    private toolConst: ToolConstService,
    private router: Router) { 
      this.editForm = this.formBuilder.group({
        firstName: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'), WhitespaceValidator
      ])],
        lastName: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'), WhitespaceValidator
      ])],
        middleName: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'), WhitespaceValidator
      ])],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        gender: ['', [Validators.required]],            
      }); 

      this.editProviderForm = this.formBuilder.group({
        firstName: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'), WhitespaceValidator
      ])],
        lastName: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'), WhitespaceValidator
      ])],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        age: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        professinalStatement: ['', [Validators.required]],
        practicingFrom: ['', [Validators.required]],  
        language: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'), WhitespaceValidator
        ])],     
        qua: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'), WhitespaceValidator
        ])], 
        price: ['', [Validators.required]],  
      }); 

      var currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log("currentUser", currentUser.name)
      this.userName = currentUser.name;
      this.role = currentUser.role;
      this.userId = currentUser.userId;
    }  

    get m(){
      //console.log("controls",this.register.controls);
      if(this.role === 'Doctor'){
        return this.editProviderForm.controls;
      }else{
      return this.editForm.controls;
      }
    }

submitData(){
    if(this.editForm.valid){
    console.log("in submit form")
    }
}

editPatient() {
  if (!this.editForm.valid) {
    this.notificationService.showNotification(this.toolConst.getErrorMessages().fillRequiredElements, 'danger');
    return false;
  } else{
    var gender = 'M';
    if(this.editForm.value.gender === "female"){
      var gender = 'F';
    }

    const body = {
      firstName:   this.editForm.value.firstName,
      gender:      gender,
      lastName:    this.editForm.value.lastName,
      middleName:  this.editForm.value.middleName,
      userId:      this.userId,
      state:       this.editForm.value.state,
      city:        this.editForm.value.city
    };

    this.authService.editPatient(body).subscribe((response) => {
      if (response['status'] === "Profile updated successfully.") {
        this.notificationService.showNotification(
          response['status'],
          "success"
        );
        this.router.navigateByUrl(`/landing`);
      } else {
        this.notificationService.showNotification(
          response['status'],
          "danger"
        );
      }
    });
  }
}

editProvider() {
  if (!this.editProviderForm.valid) {
    this.notificationService.showNotification(this.toolConst.getErrorMessages().fillRequiredElements, 'danger');
    return false;
  }else{
    var gender = 'M';
    if(this.editProviderForm.value.gender === "female"){
      var gender = 'F';
    }

    const body = {
      firstName:              this.editProviderForm.value.firstName,
      lastName:               this.editProviderForm.value.lastName,
      professionalStatement:  this.editProviderForm.value.professinalStatement,
      practicingFrom:         this.editProviderForm.value.practicingFrom,
      userLoginId:            this.userId,
      age:                    this.editProviderForm.value.age,
      gender:                 gender,
      state:                  this.editProviderForm.value.state,
      city:                   this.editProviderForm.value.city,
      qualification:          this.editProviderForm.value.qua,
      languages:              this.editProviderForm.value.language,
      consultation_fee:       this.editProviderForm.value.price, 
    };
 
    this.authService.editProvider(body).subscribe((response) => {
      if (response['status'] === "Profile updated successfully.") {
        this.notificationService.showNotification(
          response['status'],
          "success"
        );
        this.router.navigateByUrl('/landing');
      } else {
        this.notificationService.showNotification(
          response['status'],
          "danger"
        );
      }
    });
  }
}

  ngOnInit(): void {
  }

}
