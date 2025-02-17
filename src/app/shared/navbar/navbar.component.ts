import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, NavigationEnd, NavigationStart, NavigationExtras } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  public userName: string = "";

  public token: any;
  private timer: any;

  constructor(
    public location: Location,
    private router: Router,
    private commonService: CommonService
  ) {

    this.token = this.commonService.getToken();

    setTimeout(() => {
      clearInterval(this.timer);
    }, 60000);
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else window.scrollTo(0, 0);
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.checkUsername();
  }

  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === "#/home") {
      return true;
    } else {
      return false;
    }
  }
  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === "#/documentation") {
      return true;
    } else {
      return false;
    }
  }

  checkUsername() {
    this.timer = setInterval(() => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.userName = currentUser?.username.split("@")[0];
      if (this.userName) clearInterval(this.timer);
    }, 1000);
  }

  signout() {
    this.token = null;
    localStorage.removeItem("currentUser");
    this.userName = undefined;
    this.router.navigateByUrl("/signin");
  }

  providersReg(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser", currentUser);
    if (currentUser?.role === "Doctor") {
      this.router.navigateByUrl("/doctor-activities")
    } else {
      this.router.navigateByUrl("/providers-registration")
    }
  }

  doctorsPage(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userName = currentUser?.username.split("@")[0];
    if(this.userName === undefined) {
      const naviagtionExtras: NavigationExtras = {
        queryParams: {
          routeName: "doctors"
        },
      };
      this.router.navigateByUrl("/signin", naviagtionExtras);
    } else {
      this.router.navigateByUrl("/doctors");
    }
  }
}
