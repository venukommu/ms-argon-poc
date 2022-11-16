import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-doctoractivities",
  templateUrl: "./doctoractivities.component.html",
  styleUrls: ["./doctoractivities.component.scss"],
})
export class DoctoractivitiesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  getSpecialitiesList() {
    console.log("in the list");
    this.router.navigateByUrl("/physicians");
  }
}
