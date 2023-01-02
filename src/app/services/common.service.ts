import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
  getSymptoms() {
    return this.httpClient
      .get(this.fullUrl + "/prov/symptoms", {
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

  getDiagnosis() {
    return this.httpClient
      .get(this.fullUrl + "/prov/diagnosis", {
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

  doctorActivity(body){
    var token = this.getToken();
    const httpOptions = { 
      headers: new HttpHeaders(
      { 
        "Content-Type": "application/json",
        'Authorization': "Bearer "+token
      
      })
    };
    return this.httpClient
      .post(this.fullUrl + "/saveDocSpecialization",body, httpOptions)
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

  getDoctors() {
    return this.httpClient
      .get(this.fullUrl + "/prov/doctors", {
        headers: commonHeaders,
      })
      .pipe(
        map((data) => {
          console.log("data", data);
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

  getDoctorsList(name, id) {
    return this.httpClient
      .get(this.fullUrl + "/prov/getDoctors?searchType='"+name+"'&searchTypeId="+id, {
        headers: commonHeaders,
      })
      .pipe(
        map((data) => {
          console.log("data", data);
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

  getProvidersData(id) {
    var token = this.getToken();
    const httpOptions = { 
      headers: new HttpHeaders(
      { 
        "Content-Type": "application/json",
        'Authorization': "Bearer "+token
      
      })
    };
    return this.httpClient
      .get(this.fullUrl + "/getDoctorProfile?userId="+id, httpOptions
      )
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

  getPatientsData(id) {
    var token = this.getToken();
    const httpOptions = { 
      headers: new HttpHeaders(
      { 
        "Content-Type": "application/json",
        'Authorization': "Bearer "+token
      
      })
    };
    return this.httpClient
      .get(this.fullUrl + "/getProfile?userId="+id, httpOptions
      )
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
