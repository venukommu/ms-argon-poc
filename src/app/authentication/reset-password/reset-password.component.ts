import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Reset } from "src/app/services/interface";
import { Router } from "@angular/router";
import { PasswordStrengthValidator } from "../signup/password-strength.validators";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  fieldTextType: boolean;
  resetForm: FormGroup;
  inputData: any;
  public loginData: Reset = {
    password: "",
    confpassword: "",
  };

  constructor(formBuilder: FormBuilder, private router: Router,private authService: AuthService) {
    this.resetForm = formBuilder.group({
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          PasswordStrengthValidator,
        ]),
      ],
      confpassword: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          PasswordStrengthValidator,
        ]),
      ],
    });
    this.inputData = this.router.getCurrentNavigation().extras?.state;
  }
  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) {
        control.markAsTouched();
        this.markFormTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  resetPassword() {
    //this.markFormTouched(this.resetForm);
    const body = {
      username: this.inputData,
      password: this.resetForm.value.password
    }
    console.log("body",body);
    if (this.resetForm.invalid) {
      alert("Please enter valid password");
    } else {
      this.authService.resetPassword(body).subscribe((result) => {
        console.log("result",result);
        this.router.navigateByUrl("/signin");
      });
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnInit(): void {}
}
