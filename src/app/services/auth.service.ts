import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { commonHeaders } from "./common.headers";
import { map, catchError } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { NotificationsService } from "./notifications.service";
import { ToolConstService } from "./tool-const.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserRole: BehaviorSubject<any> = new BehaviorSubject(null);
  public token: string;
  public role: any;
  public error: any;
  
  constructor(private httpClient: HttpClient,
    private notificationService: NotificationsService,
    private toolConstService: ToolConstService,
    private router: Router) {}
    //private fullUrl = "http://msspoc.ap-south-1.elasticbeanstalk.com";
  private fullUrl = "http://localhost:8080";

  signup(body) {
    console.log(body);
    return this.httpClient
      .post(this.fullUrl + `/register`, body, {
        headers: commonHeaders,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          this.handleError(this.toolConstService.getErrorMessages().userExist);
          return err;
        })
      );
  }

  login(body) {
    //let body = JSON.stringify({ username, password });
    console.log("body", body)
    return this.httpClient
      .post(this.fullUrl + '/loginUser', body, {
        headers: commonHeaders,
      })
      .pipe(
        map((response: Response) => {
          console.log("response", response);
          // login successful if there's a jwt token in the response
          let token = response["jwtToken"];
         // console.log("in service call token", token)
          if (token) {
            //let jwtData = token.split(".")[1];
            //let decodedJwtJsonData = window.atob(jwtData);
            //let decodedJwtData = JSON.parse(decodedJwtJsonData);

            this.role = response["userDetails"].authorities[0].authority;
            console.log("roles", this.role)
            // if (roles.includes("ROLE_DOCTOR")) {
            //   this.role = "Doctor";
            // } else if (roles.includes("ROLE_PATIENT")) {
            //   this.role = "Patient";
            // }
            // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              "currentUser",
              JSON.stringify({
                username: response["userDetails"].username,
                token: token,
                role: this.role,
                name: response["userDetails"].fullName,
                userId: response["userDetails"].userId
              })
            );
          }
          return response; 
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          this.handleError(this.toolConstService.getErrorMessages().userNotExist);
          return err;
        })
      );
  }

  handleError = (message) => {
    this.notificationService.showNotification(
      message,
      "danger"
    );
  };

  getCurrentUser(role) {
    if (role) {
      this.currentUserRole.next(role);
    } else {
      this.currentUserRole.next(false);
    }
  }

  forgotPassword(username) {
    return this.httpClient
      .post(this.fullUrl + "/resetPassword", username, {
        headers: new HttpHeaders({Accept: "application/json",}),
      })
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err, "ERERER>>>>>>>>>>>>>>>>>");
          return err;
        })
      );
  }

  confirmPassword(otp: String) {
    //token = JSON.stringify({"passwordRecoveryToken": otp})
    console.log("verification code---------------", otp);

    // Add safe, URL encoded search parameter if there is a search term
    //const options = otp ? { params: new HttpParams().set("token", otp) } : {};
    //console.log("options",options);
    return this.httpClient
      .post(this.fullUrl + "/validatePasswordResetToken", otp)
      .pipe(
        map((data) => {
          var res = data;
          console.log(res, "Responce");
          return res;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err, "ERERER>>>>>>>>>>>>>>>>>");
          return err;
        })
      );
  }

  resetPassword(body){
    console.log(body, "entity>>>>>>>>>>>>>>>>>");

    return this.httpClient
      .post(this.fullUrl + "/changePassword", body, {
        headers: new HttpHeaders({Accept: "application/json",}),
      })
      .pipe(
        map((data) => {
          var res = data;
          console.log(res, "ERERER>>>>>>>>>>>>>>>>>");
          return res;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err, "ERERER>>>>>>>>>>>>>>>>>");
          return err;
        })
      );
  }
  getToken() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var token = currentUser && currentUser.token;
    return token;
  }

  
  editPatient(body) {
    var token = this.getToken();
    console.log("token", token);
    const httpOptions = { 
      headers: new HttpHeaders(
      { "Accept": "application/json",
        "Content-Type": "application/json",
         'JWT-AUTH-TOKEN': token,
      
      })
  };
    return this.httpClient
    .post(this.fullUrl + `/saveProfile`, body, httpOptions)
    .pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    )
    .pipe(
      catchError((err) => {
              console.log(err);
              this.handleError(this.toolConstService.getErrorMessages().updateFailed);
              return err;
            })
    );
    // return this.httpClient
    //   .post(this.fullUrl + `/saveProfile`, body, {
    //     headers: commonHeaders,
    //   })
    //   .pipe(
    //     map((res: any) => {
    //       console.log(res);
    //       return res;
    //     })
    //   )
    //   .pipe(
    //     catchError((err) => {
    //       console.log(err);
    //       this.handleError(this.toolConstService.getErrorMessages().updateFailed);
    //       return err;
    //     })
    //   );
  }

  editProvider(body) {
    console.log(body);
    console.log("commonHeaders", commonHeaders)
    return this.httpClient
      .post(this.fullUrl + `/saveDocProfile`, body, {
        headers: commonHeaders,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          this.handleError(this.toolConstService.getErrorMessages().updateFailed);
          return err;
        })
      );
  }
}
