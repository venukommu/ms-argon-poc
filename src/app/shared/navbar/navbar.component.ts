import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";
import { AuthService } from "src/app/services/auth.service";

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
  private timer:any;

  constructor(public location: Location, private router: Router,
              public authService: AuthService) {
    this.token = this.authService.getToken();
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

    this.timer = setInterval(() => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.userName = currentUser?.username.split('@')[0];
      if (this.userName) clearInterval(this.timer);
    }, 1000);
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

  signout() {
    this.token = null;
    localStorage.removeItem("currentUser");
    this.userName = undefined;
    this.router.navigateByUrl("/signin");
  }

}
