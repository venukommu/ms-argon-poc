import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-migrainetreatmentdocs",
  templateUrl: "./migrainetreatmentdocs.component.html",
  styleUrls: ["./migrainetreatmentdocs.component.scss"],
})
export class MigrainetreatmentdocsComponent implements OnInit {
  public currentYear: number;
  public docList: any;
  public title:any;

  constructor(private commonService: CommonService, private router: Router) {
    this.currentYear = new Date().getFullYear();  
    const diagParams = this.router.getCurrentNavigation().extras?.queryParams;
    this.title = diagParams?.Title;
    
    if (diagParams?.Id) { 
      this.commonService.getDoctorsList('diagnosis',diagParams?.Id).subscribe((response) => {
          if (response['doctorsList'].length > 0) {
            this.docList = response['doctorsList'];
          }
      });
    }
  }
  
  ngOnInit(): void {}
}
