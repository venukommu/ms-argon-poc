import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { LandingComponent } from "./landing/landing.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";

import { MatNativeDateModule } from "@angular/material/core";

import { HomeModule } from "./home/home.module";
import { LoginComponent } from "./login/login.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { ToolConstService } from "./services/tool-const.service";
import { NotificationsService } from "./services/notifications.service";
import { SelfcheckComponent } from "./selfcheck/selfcheck.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { PhysiciansComponent } from "./physicians/physicians.component";
import { MigrainetreatmentdocsComponent } from "./migrainetreatmentdocs/migrainetreatmentdocs.component";
import { DoctoractivitiesComponent } from "./doctoractivities/doctoractivities.component";
import { ProviderRegistrationComponent } from "./provider-registration/provider-registration.component";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { EditprofileComponent } from "./pages/editprofile/editprofile.component";
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SelfcheckComponent,
    DoctorsComponent,
    PhysiciansComponent,
    MigrainetreatmentdocsComponent,
    DoctoractivitiesComponent,
    ProviderRegistrationComponent,
    EditprofileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    AuthenticationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    NotificationsService,
    ToolConstService,
    MatNativeDateModule,
    NavbarComponent,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
