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
  public docList : any;
  public title:any;

  constructor(private commonService: CommonService, private router: Router) {
    this.currentYear = new Date().getFullYear();  

    const diagParams = this.router.getCurrentNavigation().extras?.queryParams;
    console.log("diagParams", diagParams)
    //this.diagName = diagParams.specializationName;
    this.title = diagParams.specializationTitle;
    this.commonService.getDoctorsList('diagnosis',diagParams.specializationId).subscribe((response) => {
        console.log("responce", response['doctorsList'])
        if (response['doctorsList'].length > 0) {
           this.docList = response['doctorsList'];
        }
    });
  }
  migrainedocInfo = [
    {
      img: "./assets/img/hospital/doctor1.jpeg",
      name: "Dr. John paul",
      exp: "22 years exp",
      quali: "MBBS, MD (General Medicine)",
      prof: "Neurologist",
      lang: "English, Hindi",
      fee: "₹300 Consultation fee",
    },
    {
      img: "./assets/img/hospital/doctor2.jpeg",
      name: "Dr. Henry",
      exp: "18 years exp",
      quali: "MBBS",
      prof: "Neurologist",
      lang: "English",
      fee: "₹300 Consultation fee",
    },
    {
      img: "./assets/img/hospital/doctor3.jpeg",
      name: "Dr. Andrew Hall",
      exp: "14 years exp",
      quali: "MBBS, MS",
      prof: "Neurologist",
      lang: "English, Hindi",
      fee: "₹300 Consultation fee",
    },
    {
      img: "./assets/img/hospital/doctor4.jpeg",
      name: "Dr. Elizabeth",
      exp: "12 years exp",
      quali: "MBBS, DNB",
      prof: "Neurologist",
      lang: "English",
      fee: "₹300 Consultation fee",
    },
    {
      img: "./assets/img/hospital/doctor5.jpeg",
      name: "Dr. Rebecca",
      exp: "8 years exp",
      quali: "MBBS, MD (General Medicine)",
      prof: "Neurologist",
      lang: "English, Hindi",
      fee: "₹300 Consultation fee",
    },
  ];
  ngOnInit(): void {}
}
