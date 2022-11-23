import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { commonHeaders } from "./common.headers";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  
  constructor(private httpClient: HttpClient) {}
  private fullUrl = "http://medicalservices-env.eba-dmfdzmmi.ap-south-1.elasticbeanstalk.com";
  signup(body) {
    return this.httpClient.post(this.fullUrl + "/register?", body, {
        headers: commonHeaders,
      })
      .toPromise()
      .then((response: Response) => {
        let res = response["_body"];
        console.log("res",res);
        return res;
      });
  }
}
