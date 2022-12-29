import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})
export class SymptomsComponent implements OnInit {
  public symptoms: any;
  public selectedIssues: any;
  public selectedIssue: any;
  public healthIssues: any;
  public healthIssue: any;
  public skinAndHair: any;
  public skinIssue: any;
  public userId: any;
  public docSym : any = [];

  constructor(private router: Router, private commonService: CommonService) {
    var currentUser = JSON.parse(
      JSON.stringify(localStorage.getItem("currentUser"))
    );
    this.userId = JSON.parse(currentUser)['userId'];

    this.selectedIssues = ['Fever','Acne', 'Runny Nose', 'Cough', 'Headache', 'Hairfall'];
    this.healthIssues = ['Back-Pain', 'High BP', 'Constipation', 'Diabetes', 'Gas',	'Throat Pain'];
    this.skinAndHair = ['Dark Circles','Reddish Skin','Itching','Rashes','Pimples','Dandruff']

    this.commonService.getSymptoms().subscribe((response) => {
      this.symptoms = response['symptoms'];
      console.log('this.symptoms',this.symptoms);
      this.selectedIssue = this.symptoms.filter((item) => {
        if (this.selectedIssues.includes(item.symptomDescription)){
          return item !== undefined ;
        }
      });
      this.healthIssue = this.symptoms.filter((item) => {
        if (this.healthIssues.includes(item.symptomDescription)){
          return item !== undefined ;
        }
      });
      this.skinIssue = this.symptoms.filter((item) => {
        if (this.skinAndHair.includes(item.symptomDescription)){
          return item !== undefined ;
        }
      });
      console.log("selectedIssue",this.selectedIssue);
    });
  }

  ngOnInit(): void {
  }
  getSpecialitiesList() {
      console.log("in the list")
      if (this.docSym.length > 0){
        const naviagtionExtras: NavigationExtras = {
          queryParams: {
            routeName: "physicians",
            symtomData: this.docSym
          },
        };
        this.router.navigateByUrl("/physicians",naviagtionExtras);
      }
  }

  selectedItem(id, isChecked){
    console.log("id", id, isChecked);
    if (isChecked) {
      this.docSym.push({'specializationType': 'symptoms', 'specializationTypeId': id})
    } else {
      if (this.docSym.find(x => x.specializationType === 'Symptoms' && x.specializationTypeId === id)) {
        this.docSym.splice(this.docSym.findIndex(x => x.specializationType === 'Symptoms' && x.specializationTypeId === id), 1);
      }
    }
    console.log("this.docSym",this.docSym);
  }

}
