import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { commonHeaders } from "./common.headers";
import { map, catchError } from "rxjs/operators";
import { NotificationsService } from "./notifications.service";
import { ToolConstService } from "./tool-const.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  public token: string;
  public role: any;
  public error: any;
  
  constructor(private httpClient: HttpClient) {}
    private fullUrl = "http://msspoc.ap-south-1.elasticbeanstalk.com";
    //private fullUrl = "http://localhost:8080";

  getToken() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var token = currentUser && currentUser.token;
    return token;
  }

  getSpecialties() {
    return this.httpClient
      .get(this.fullUrl + "/prov/specializations", {
        headers: commonHeaders,
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

}
