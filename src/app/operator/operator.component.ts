import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-operator',
  templateUrl: 'operator.component.html',
  styleUrls: ['operator.component.css']
})
export class OperatorComponent implements OnInit {

  errorMessage: string = '';
  errorMessageApel: string = '';
  displayEditApel: boolean = false;
  listOperatorApel;
  editApelVar: number;
  editApelSubject: string;
  editApelLang: string;
  editApelNumVop: number;
  questionApelResultList;
  editApelID;
  dr: string = '';
  disableEditApel: boolean = false;

  descResult: string = '';

  constructor(private service: AppService) { }

  onSelectedApel(dt) {
    
    this.editApelID = dt.data.id;
    this.editApelVar = dt.data.varNo;
    this.editApelSubject = dt.data.subject.nameRus;
    this.editApelLang = dt.data.lang.nameRus;
    this.editApelNumVop = dt.data.questionNo;
    this.disableEditApel = true;
    this.descResult = '';
    this.questionApelResultList = [];
    this.service.getQuestionApelResult().subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();          
          if (data.errorCode == 0) {
            this.questionApelResultList = data.res;
          } else {
            this.errorMessage = data.errorMsgRus;
          }
        } else console.log(data);
      },
      error => {

        if (error.status == 403) {

        } else if (error.status == 500) {
          console.log(error);
        } else console.log(error);
      }
    );

  }

  editApelResult() {
    this.dr = '';
    this.displayEditApel = true;
  }

  displayEditApelClose() {
    this.displayEditApel = false;
  }

  setResultApel(idResult, desc) {
    this.service.updateContApel(this.editApelID, idResult, desc).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.displayEditApelClose();
            this.getOperatorApel();
          } else {
            this.errorMessageApel = data.errorMsgRus;
          }
        } else console.log(data);
      },
      error => {

        if (error.status == 403) {

        } else if (error.status == 500) {
          console.log(error);
        } else console.log(error);
      }
    )
  }
  restartInfo() {
    this.disableEditApel = false;
    this.getOperatorApel();
  }


  getOperatorApel() {
    this.service.getOperatorApel().subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          console.log(data);
          if (data.errorCode == 0) {
            this.listOperatorApel = data.res;
          } else {
            this.errorMessage = data.errorMsgRus;
          }
        } else console.log(data);
      },
      error => {

        if (error.status == 403) {

        } else if (error.status == 500) {
          console.log(error);
        } else console.log(error);
      }
    )
  }

  ngOnInit() {
    this.listOperatorApel = [];
    this.getOperatorApel();
    this.questionApelResultList = [];
    this.service.getQuestionApelResult().subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          console.log(data);
          if (data.errorCode == 0) {
            this.questionApelResultList = data.res;
          } else {
            this.errorMessage = data.errorMsgRus;
          }
        } else console.log(data);
      },
      error => {

        if (error.status == 403) {

        } else if (error.status == 500) {
          console.log(error);
        } else console.log(error);
      }
    )



  }

}
