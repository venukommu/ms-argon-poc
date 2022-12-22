import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})
export class SymptomsComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
  getSpecialitiesList() {
      console.log("in the list")
        this.authService.doctorsList(searchItems).subscribe((result) => {
          console.log("result",result);
          this.router.navigateByUrl("/physicians");
        });
      
      // this.router.navigateByUrl("/physicians");
  }

    doctorsList() {
      //this.markFormTouched(this.resetForm);
     
      }

  

}
