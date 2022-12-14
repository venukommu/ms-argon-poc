import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-physicians",
  templateUrl: "./physicians.component.html",
  styleUrls: ["./physicians.component.scss"],
})
export class PhysiciansComponent implements OnInit {
  public doctorsList = [];
  public currentYear: number;
  physiciansInfo = [
    {
      img: "./assets/img/hospital/doctor1.jpeg",
      name: "Dr. John",
      exp: "22 years exp",
      quali: "MBBS, MD (General Medicine)",
      prof: "Physician",
      lang: "English, Hindi",
      fee: "₹300 Consultation fee",
    },
    {
      img: "./assets/img/hospital/doctor2.jpeg",
      name: "Dr. Stephen",
      exp: "18 years exp",
      quali: "MBBS, MD",
      prof: "Physician",
      lang: "English",
      fee: "₹500 Consultation fee",
    },
    {
      img: "./assets/img/hospital/doctor3.jpeg",
      name: "Dr. Andrew Hall",
      exp: "14 years exp",
      quali: "MBBS, MD (General Medicine)",
      prof: "Physician",
      lang: "English, Hindi",
      fee: "₹400 Consultation fee",
    },
    {
      img: "./assets/img/hospital/doctor4.jpeg",
      name: "Dr. Elizabeth",
      exp: "12 years exp",
      quali: "MBBS, MD",
      prof: "Physician",
      lang: "English",
      fee: "₹400 Consultation fee",
    },
    {
      img: "./assets/img/hospital/doctor5.jpeg",
      name: "Dr. Rebecca",
      exp: "8 years exp",
      quali: "MBBS, MS",
      prof: "Physician",
      lang: "English, Hindi",
      fee: "₹300 Consultation fee",
    },
  ];


  constructor(private commonService: CommonService) {
    this.currentYear = new Date().getFullYear();  
    this.commonService.getDoctors().subscribe((response) => {
      console.log("response", response);
      this.doctorsList = response['doctors'];
    });
  }

  openPopup() {
    let popup = document.getElementById("popup");

    popup.classList.add("open-popup");
  }

  closePopup() {
    let popup = document.getElementById("popup");

    popup.classList.remove("open-popup");
  }

  ngOnInit(): void {}
}
