import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";
import { NotificationsService } from "src/app/services/notifications.service";

@Component({
  selector: "app-doctoractivities",
  templateUrl: "./doctoractivities.component.html",
  styleUrls: ["./doctoractivities.component.scss"],
})
export class DoctoractivitiesComponent implements OnInit {
  constructor(private router: Router, private commonService:CommonService,
    private notificationService:NotificationsService) {}

  ngOnInit(): void {
    let popup = document.getElementById("popup");
    popup.classList.add("none");
  }

  getSpecialitiesList() {
    console.log("in the list");
    this.router.navigateByUrl("/physicians");
  }

  openPopup() {
    let popup = document.getElementById("popup");
    popup.classList.add("notNone");
    const body = {
      id: 1,
      userId: 15,
      specializationType: "Physician",
      specializationTypeId: 1
    }
    this.commonService.doctorActivity(body).subscribe((response) => {
      if (response['status'] === "true") {
        this.notificationService.showNotification(
          response['status'],
          "success"
        );
      } else {
        this.notificationService.showNotification(
          response['status'],
          "danger"
        );
      }
    });

  }

  closePopup() {
    let popup = document.getElementById("popup");
    popup.classList.remove("notNone");
    this.router.navigateByUrl("/landing");
  }
}
