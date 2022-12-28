import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { ToolConstService } from "../services/tool-const.service";

@Component({
  selector: "app-doctoractivities",
  templateUrl: "./doctoractivities.component.html",
  styleUrls: ["./doctoractivities.component.scss"],
})
export class DoctoractivitiesComponent implements OnInit {
  public specializations: any;
  public diagnosis: any;
  public symptoms:any;
  public docSpecial: any = [];
  public userId: any;

  constructor(private router: Router, private commonService:CommonService,
    private notificationService:NotificationsService,
    private toolConstService: ToolConstService) {
      var currentUser = JSON.parse(
        JSON.stringify(localStorage.getItem("currentUser"))
      );
      this.userId = JSON.parse(currentUser)['userId'];

      this.commonService.getSpecialties().subscribe((response) => {
        this.specializations = response['specializations'];
      });
      this.commonService.getSymptoms().subscribe((response) => {
        this.symptoms = response['symptoms'];
        console.log("this.symptoms",this.symptoms);
      });
      this.commonService.getDiagnosis().subscribe((response) => {
        this.diagnosis = response['diagnosis'];
        console.log("this.diagnosis",this.diagnosis);
      });
    }

  ngOnInit(): void {
    let popup = document.getElementById("popup");
    popup.classList.add("none");
  }

  getSpecialitiesList() {
    console.log("in the list");
    this.router.navigateByUrl("/physicians");
  }

  openPopup() {
    if (this.docSpecial.length > 0) {   
      this.commonService.doctorActivity(this.docSpecial).subscribe((response) => {
        if (response['status'] === true) {
          this.notificationService.showNotification(
            this.toolConstService.getSuccessMessage().saved,
            "success"
          );
        } else {         
          this.notificationService.showNotification(
            this.toolConstService.getErrorMessages().savingFailed,
            "danger"
          );
        }
      });
      let popup = document.getElementById("popup");
      popup.classList.add("notNone");
    } else {
      this.notificationService.showNotification(
        "Please choose specialization/Symptoms/Diagnosis",
        "danger"
      );
    }
  }

  closePopup() {
    let popup = document.getElementById("popup");
    popup.classList.remove("notNone");
    this.router.navigateByUrl("/landing");
  }

  selectedItem(id, type, isChecked){
    if (isChecked) {
      this.docSpecial.push({'userId': this.userId, 'specializationType': type, 'specializationTypeId': id})
    } else {
      if (this.docSpecial.find(x => x.specializationType == type && x.specializationTypeId == id)) {
        this.docSpecial.splice(this.docSpecial.findIndex(x => x.specializationType == type && x.specializationTypeId == id), 1);
      }
    }
  }
}
