import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { commonHeaders } from "./common.headers";
import { map, catchError } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserRole: BehaviorSubject<any> = new BehaviorSubject(null);
  public token: string;
  public role: any;
  
  constructor(private httpClient: HttpClient) {}
  //private fullUrl = "http://medicalservices-env.eba-dmfdzmmi.ap-south-1.elasticbeanstalk.com";
  private fullUrl = "http://localhost:8080";
  // signup(body) {
  //   return this.httpClient.post(this.fullUrl + "/register?", body, {
  //       headers: commonHeaders,
  //     })
  //     .toPromise()
  //     .then((response: Response) => {
  //       let res = response["_body"];
  //       console.log("res",res);
  //       return res;
  //     });
  // }

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
          //let token = response.json() && response.json().token;
         // console.log("in service call token", token)
          let token = ''
          if (token) {
            let jwtData = token.split(".")[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);

            const roles = decodedJwtData.roles;
            console.log("roles", roles)
            if (roles.includes("ROLE_DOCTOR")) {
              this.role = "Doctor";
            } else if (roles.includes("ROLE_PATIENT")) {
              this.role = "Patient";
            }
            // set token property
            this.token = token;

            //const roles = decodedJwtData.roles

            // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem(
            //   "currentUser",
            //   JSON.stringify({
            //     username: username,
            //     token: token,
            //     role: this.role,
            //   })
            // );
          } else {
            return false;
          }
        })
      )
      //.pipe(catchError((err) => this.handleError()));
  }

  getCurrentUser(role) {
    if (role) {
      this.currentUserRole.next(role);
    } else {
      this.currentUserRole.next(false);
    }
  }
}
