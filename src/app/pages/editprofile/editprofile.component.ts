import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder,FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { ToolConstService } from "src/app/services/tool-const.service";
import { WhitespaceValidator } from 'src/app/services/validators/whitespace.validator';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe } from '@angular/common';

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
  public userDetails: any;
  public providerDetails:any;
  public isMale: boolean;
  public isFemale:boolean;
  public isEdit: boolean;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,
    private notificationService: NotificationsService,
    private toolConst: ToolConstService,
    private router: Router, private commonService: CommonService,
    private datePipe: DatePipe) { 
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
      console.log("currentUser", currentUser)
      this.userName = currentUser.name;
      this.role = currentUser.role;
      this.userId = currentUser.userId;
      this.isEdit = false;

     if(this.role !== 'Doctor'){
      this.commonService.getPatientsData(this.userId).subscribe((res) => {
        console.log("res", res)
        if (res['userAccDet'] !== null) {
            this.userDetails = res['userAccDet'];
            this.isEdit = true;
        if(this.userDetails.gender === 'M'){
          this.isMale = true
          this.isFemale = false
        }else{
          this.isMale = false
          this.isFemale = true
        }
        this.editForm.patchValue({
            firstName: this.userDetails.firstName,
            lastName: this.userDetails.lastName,
            middleName: this.userDetails.middleName,
            city: this.userDetails.city,
            state: this.userDetails.state,
            gender: this.userDetails.gender === 'M'? this.isMale: this.isFemale,
        });
        }
      });
    }else{
       this.commonService.getProvidersData(this.userId).subscribe((res) => {
        if (res['doctorProfile'] !== null) {
            this.providerDetails = res['doctorProfile'];
        this.isEdit = true;
       // this.providerDetails.practicingFrom = this.datePipe.transform(this.providerDetails.practicingFrom,"yyyy-MM-dd")
        if(this.providerDetails.gender === 'M'){
          this.isMale = true
          this.isFemale = false
        }else{
          this.isMale = false
          this.isFemale = true
        }
        this.editProviderForm.patchValue({
            firstName: this.providerDetails.firstName,
            lastName: this.providerDetails.lastName,
            city: this.providerDetails.city,
            state: this.providerDetails.state,
            age: this.providerDetails.age,
            gender: this.providerDetails.gender === 'M'? this.isMale: this.isFemale,
            professinalStatement: this.providerDetails.professionalStatement,
            practicingFrom: this.datePipe.transform(this.providerDetails.practicingFrom,"yyyy-MM-dd"),
            language: this.providerDetails.languages,
            qua: this.providerDetails.qualification,
            price: this.providerDetails.consultationFee
        });
      }
      });
    }
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
  console.log("firstname", this.editForm.value.firstName);
  console.log("gender",this.editForm.value.gender );
  console.log("last name", this.editForm.value.lastName );
  console.log("mname", this.editForm.value.middleName)
  console.log("state", this.editForm.value.state)
  console.log("city",this.editForm.value.city)
  console.log("user id", this.userId)
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
      city:        this.editForm.value.city,
      id:          this.isEdit? this.userDetails.id : 0 
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
  console.log("in editProvider doctorId", this.providerDetails.doctorId)
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
      consultationFee:        this.editProviderForm.value.price, 
      doctorId:               this.isEdit? this.providerDetails.doctorId : 0 
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
