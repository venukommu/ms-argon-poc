import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  @ViewChild("widgetsContent") widgetsContent: ElementRef;
  @ViewChild("widgetsSymptoms") widgetsSymptoms: ElementRef;
  @ViewChild("widgetsDiagnosis") widgetsDiagnosis: ElementRef;

  public userName: string = "";
  public specializations: any;
  public diagnosis: any;
  public symptoms:any;

  specialitiesImgs = [
    {
      title: "Physician",
      url: "/physicians",
    },
    {
      title: "Gynaecologist",
      url: "/gynaecologist",
    },
    {
      title: "Pediatrician",
      url: "/pediatrician",
    },
    {
      title: "Orthopedician",
      url: "/ortho",
    },
    {
      title: "Eye-specialist",
      url: "/eyespecialist",
    },
    {
      title: "Physiotherapist",
      url: "#",
    },
    {
      title: "Dentist",
      url: "/dentist",
    }
  ];

  diagnosisImgs = [
    {
      img: "./assets/img/hospital/self-check-Migraine.png",
      title: "Migraine",
      url: "/migraine-treatment-doctors",
    },
    {
      img: "./assets/img/hospital/selfcheck-Diabetes.png",
      title: "Diabetes",
      url: "/diabetes-treatment-doctors",
    },
    {
      img: "./assets/img/hospital/selfcheck-Thyroid.png",
      title: "Thyroid",
      url: "#",
    },
    {
      img: "./assets/img/hospital/selfcheck-Heart-Health.png",
      title: "Heart Health",
      url: "#",
    },
    {
      img: "./assets/img/hospital/selfcheck-COVID.png",
      title: "COVID-19",
      url: "/physicians",
    },
  ];
  focus: any;
  focus1: any;

  constructor(private router: Router, private commonService: CommonService) {

    this.commonService.getSpecialties().subscribe((response) => {
      console.log("response",response);
      this.specializations = response['specializations'];
    });
    this.commonService.getSymptoms().subscribe((response) => {
      this.symptoms = response['symptoms'];
    });
    this.commonService.getDiagnosis().subscribe((response) => {
      this.symptoms = response['diagnosis'];
    });
    
  }

  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 230;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 230;
  }
  scrollLeftSymp() {
    this.widgetsSymptoms.nativeElement.scrollLeft -= 230;
  }

  scrollRightSymp() {
    this.widgetsSymptoms.nativeElement.scrollLeft += 230;
  }

  scrollLeftDiagno() {
    this.widgetsDiagnosis.nativeElement.scrollLeft -= 230;
  }

  symptomsRoute() {
    const naviagtionExtras: NavigationExtras = {
      queryParams: {
        routeName: "/symptoms",
      },
    };

    if (this.userName === undefined) {
      this.router.navigateByUrl("/signin", naviagtionExtras);
    } else {
      setTimeout(() => {
        this.router.navigateByUrl("/symptoms");
      }, 500);
    }
  }

  specialitiesRoute() {
    const naviagtionExtras: NavigationExtras = {
      queryParams: {
        routeName: "/doctors",
      },
    };
    if (this.userName === undefined) {
      this.router.navigateByUrl("/signin", naviagtionExtras);
    } else {
      setTimeout(() => {
        this.router.navigateByUrl("/doctors");
      }, 500);
    }
  }

  diagnosisRoute() {
    const naviagtionExtras: NavigationExtras = {
      queryParams: {
        routeName: "/selfcheck",
      },
    };

    if (this.userName === undefined) {
      this.router.navigateByUrl("/signin", naviagtionExtras);
    } else {
      setTimeout(() => {
        this.router.navigateByUrl("/selfcheck");
      }, 500);
    }
  }

  scrollRightDiagno() {
    this.widgetsDiagnosis.nativeElement.scrollLeft += 230;
  }

  ngOnInit() {
    for (var i = 0; i < this.bubblyButtons.length; i++) {
      this.bubblyButtons[i].addEventListener(
        "click",
        this.animateButton,
        false
      );
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userName = currentUser?.username.split("@")[0];
  }

  animateButton(e) {
    e.preventDefault;
    //reset animation
    e.target.classList.remove("animate");

    e.target.classList.add("animate");
    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);
  }

  bubblyButtons = document.getElementsByClassName("button");

  splRoute(name){
    var url;
    for( let spl of this.specialitiesImgs){
      if (spl.title === name){
        url = spl.url;
      }
    }
    console.log("url",url);
    const naviagtionExtras: NavigationExtras = {
      queryParams: {
        routeName: url,
      },
    };
    console.log("this.userName",this.userName);
    if (this.userName === undefined) {
      this.router.navigateByUrl("/signin", naviagtionExtras);
    } else {
      setTimeout(() => {
        this.router.navigateByUrl(url);
      }, 500);
    }
  }


}
