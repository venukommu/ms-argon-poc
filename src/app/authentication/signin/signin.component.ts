import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { ToolConstService } from "src/app/services/tool-const.service";
import { NavbarComponent } from "src/app/shared/navbar/navbar.component";
import { PasswordStrengthValidator } from "../signup/password-strength.validators";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  login: FormGroup;
  showPassword: boolean;
  error = "";
  zipcode = "";

  private routeName = "";

  public loginData = {
    username: "",
    password: "",
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private toolConstService: ToolConstService,
    private nav: NavbarComponent
  ) {
    const patientParams = this.router.getCurrentNavigation().extras.queryParams;
    console.log(patientParams?.routeName);
    localStorage.setItem("route", patientParams?.routeName);
    this.routeName = patientParams?.routeName;

    this.login = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
          ),
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          PasswordStrengthValidator,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    for (var i = 0; i < this.bubblyButtons.length; i++) {
      this.bubblyButtons[i].addEventListener(
        "click",
        this.animateButton,
        false
      );
    }
  }

  // submitForm() {
  //   console.log("hello");
  //   // for (let v in this.login_form.controls) {
  //   //   this.login_form.controls[v].markAsTouched();
  //   // }
  //   console.log(this.login, this.zipcode, this.loginData);
  //   localStorage.setItem(
  //     "currentUser",
  //     JSON.stringify({
  //       username: this.login.value.email,
  //       password: this.login.value.password,
  //       role: "patient",
  //       zipcode: this.zipcode,
  //     })
  //   );

  //   // this.Nav.loginNav(this.login, this.zipcode);

  //   if (this.routeName === undefined) {
  //     this.router.navigateByUrl(`/landing`);
  //   } else {
  //     this.router.navigateByUrl(`/${this.routeName}`);
  //   }

  //   this.markFormTouched(this.login);
  //   if (this.login.valid) {
  //     var username = this.login.value.email;
  //     var password = this.login.value.password;
  //     let zipcode = this.login.value.zipcode;
  //     // You will get form value if your form is valid
  //     var formValues = this.login.getRawValue;
  //     console.log(this.login);
  //     console.log(zipcode);
  //   } else {
  //     //this.login.controls["terms"].setValue(false);
  //   }
  // }
  submitForm() {
    console.log("hello");
    if (!this.login.valid) {
      return false;
    } else {
      var username = this.login.value.email;
      var password = this.login.value.password;
      console.log("username", username);
      console.log("pwd", password);
      const body = {
        username: username,
        password: password,
      };
      this.authService.login(body).subscribe((result) => {
        console.log("result", result);
        this.nav.checkUsername();
        var currentUser = JSON.parse(
          JSON.stringify(localStorage.getItem("currentUser"))
        );
        if (this.routeName === undefined) {
          this.router.navigateByUrl(`/landing`);
        } else {
          this.router.navigateByUrl(`/${this.routeName}`);
        }
        var role = JSON.parse(currentUser)["role"];
        this.authService.getCurrentUser(role);
      });
    }
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

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  ValidateZip(e) {
    this.zipcode = e.target.value;
  }

  animateButton(e) {
    e.preventDefault;
    //reset animation
    e.target.classList.remove("animate");

    e.target.classList.add("animate");
    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);
  }

  bubblyButtons = document.getElementsByClassName("button");
}
