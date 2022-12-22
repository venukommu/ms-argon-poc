import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import { SelfcheckComponent } from "./selfcheck/selfcheck.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { PhysiciansComponent } from "./physicians/physicians.component";
import { MigrainetreatmentdocsComponent } from "./migrainetreatmentdocs/migrainetreatmentdocs.component";
import { DoctoractivitiesComponent } from "./doctoractivities/doctoractivities.component";
import { ProviderRegistrationComponent } from "./provider-registration/provider-registration.component";
import { EditprofileComponent } from "./pages/editprofile/editprofile.component";

const routes: Routes = [
  // { path: "home", component: HomeComponent },
  { path: "user-profile", component: ProfileComponent },
  // { path: "register", component: SignupComponent },
  { path: "landing", component: LandingComponent },
  { path: "doctors", component: DoctorsComponent },
  // { path: "login", component: LoginComponent },
  { path: "", redirectTo: "landing", pathMatch: "full" },
  { path: "selfcheck", component: SelfcheckComponent },
  { path: "physicians", component: PhysiciansComponent },
  {
    path: "diagnosis-docs",
    component: MigrainetreatmentdocsComponent,
  },
  {
    path: "doctor-activities",
    component: DoctoractivitiesComponent,
  },
  {
    path: "providers-registration",
    component: ProviderRegistrationComponent,
  },
  {
    path: "edit-profile",
    component: EditprofileComponent,
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
