import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { SigninComponent } from "./signin/signin.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./signup/signup.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SymptomsComponent } from './symptoms/symptoms.component';
import { OtpComponent } from './otp/otp.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    SymptomsComponent,
    OtpComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
})
export class AuthenticationModule {}
