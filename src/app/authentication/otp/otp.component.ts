import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "src/app/services/notifications.service";
import { ToolConstService } from "src/app/services/tool-const.service";

export interface Otp {
  otp: string;
}

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  public loginData: Otp = {
    otp: "",
  };
  inputData: any;

  constructor(private authService: AuthService, private router: Router,
    private notificationService: NotificationsService,
    private toolConstService: ToolConstService) { 
      this.inputData = this.router.getCurrentNavigation().extras?.state;
    }

  ngOnInit(): void {
  }

  getOtp(otp) {
    console.log(otp);
    this.authService.confirmPassword(otp).subscribe((result) => {
      console.log(result["entity"].entityId, ">>>>>>>");
      console.log(result, ">>>>>>>");
      if (result["status"] === true) {
        this.router.navigateByUrl("/reset", { state: this.inputData });
      }
      //this.notificationService.showNotification(result["message"], "success");
      //this.loading = false;
    });
  }
}
