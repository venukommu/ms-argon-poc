import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.scss']
})
export class DentistComponent implements OnInit {
  public currentYear: number;
  public doctorsList: [];
  dentistInfo = [
    { img: "./assets/img/hospital/doctor1.jpeg", name: "Dr. John", exp: "22 years exp",
    quali: "BDS", prof: "Dentist", lang: "English, Hindi", fee: "₹300 Consultation fee" },
    { img: "./assets/img/hospital/doctor2.jpeg", name: "Dr. Stephen", exp: "18 years exp",
    quali: "BDS, MDS", prof: "Dentist", lang: "English", fee: "₹300 Consultation fee"},
    { img: "./assets/img/hospital/doctor3.jpeg", name: "Dr. Andrew Hall", exp: "14 years exp",
    quali: "BDS", prof: "Dentist", lang: "English, Hindi", fee: "₹300 Consultation fee" },
    { img: "./assets/img/hospital/doctor4.jpeg", name: "Dr. Elizabeth", exp: "12 years exp",
    quali: "BDS, MDS", prof: "Dentist", lang: "English", fee: "₹300 Consultation fee" },
    {
      img: "./assets/img/hospital/doctor5.jpeg", name: "Dr. Rebecca", exp: "8 years exp",
      quali: "BDS, MDS", prof: "Dentist", lang: "English, Hindi",fee: "₹300 Consultation fee"
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
