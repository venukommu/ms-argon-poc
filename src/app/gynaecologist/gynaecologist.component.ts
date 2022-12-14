import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-gynaecologist',
  templateUrl: './gynaecologist.component.html',
  styleUrls: ['./gynaecologist.component.scss']
})
export class GynaecologistComponent implements OnInit {
  public doctorsList = [];
  public currentYear: any;
  gynaecInfo = [
    { img: "./assets/img/hospital/doctor1.jpeg", name: "Dr. Anthony", exp: "22 years exp",
    quali: "MBBS, DNB", prof: "Gynaecologist", lang: "English, Hindi", fee: "₹300 Consultation fee" },
    { img: "./assets/img/hospital/doctor2.jpeg", name: "Dr. Donald", exp: "18 years exp",
    quali: "MBBS, DNB", prof: "Gynaecologist", lang: "English", fee: "₹300 Consultation fee"},
    { img: "./assets/img/hospital/doctor3.jpeg", name: "Dr. Kevin", exp: "14 years exp",
    quali: "MBBS, DNB", prof: "Gynaecologist", lang: "English, Hindi", fee: "₹300 Consultation fee" },
    { img: "./assets/img/hospital/doctor4.jpeg", name: "Dr. Stella", exp: "12 years exp",
    quali: "MBBS, DNB", prof: "Gynaecologist", lang: "English", fee: "₹300 Consultation fee" },
    {
      img: "./assets/img/hospital/doctor5.jpeg", name: "Dr. Grace", exp: "8 years exp",
      quali: "MBBS, DNB", prof: "Gynaecologist", lang: "English, Hindi", fee: "₹300 Consultation fee"
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

    popup.classList.add("open-popup")
  }

  closePopup() {
    let popup = document.getElementById("popup");

    popup.classList.remove("open-popup")
  }

  ngOnInit(): void {
  }

}
