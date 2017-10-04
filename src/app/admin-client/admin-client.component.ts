import { Observable } from 'rxjs/Observable';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-admin-client',
  templateUrl: 'admin-client.component.html',
  styleUrls: ['admin-client.component.css']
})
export class AdminClientComponent implements OnInit {

  public n: number = 1;
  errorMessage: string = '';
  datePtk;
  datePtkSelect;
  datePtkModel;
  listApelModel;
  statuOut: boolean = true;
  selectedTableInfo = [];
  apelInfo;
  singleApelInfo;
  visForm2: number = 0;
  selectedPackageID: number = 0;
  timer: NodeJS.Timer;
  sendButton: boolean = false;
  day:number = new Date().getDate();
  year:number = new Date().getFullYear();
  mouth:string[]=[
    "қаңтар","ақпан","наурыз","сәуір","мамыр","маусым",
    "шілде","тамыз","қыркүйек","қазан","қараша","желтоқсан"
  ];

  mouthInfo=new Date().getMonth();
  mouthInfoForm = this.mouth[this.mouthInfo];
  
  constructor(private service: AppService) { }

  onSelectedClient(dt) {
    this.errorMessage = '';
    this.selectedTableInfo = dt.data;
    this.selectedPackageID = dt.data.id;
    if ((dt.data.print == 0) && (dt.data.raspr == 0)) {
      this.sendButton = true;
    } else {
      this.sendButton = false;
    }
  }

  ngOnInit() {
    this.datePtkModel = [];
    this.service.getDatePtk().subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.datePtkModel = data.res;

          } else {
            this.datePtkModel = data.errorMsgRus;
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


  sendApelPackage() {
    this.service.sendApels(this.selectedPackageID).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.getApelListDate(this.datePtkSelect);
          } else {
            alert(data.errorMsgRus);
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


  getApelListDate(dataPtk) {
    this.datePtk = dataPtk;
    this.listApelModel = [];
    this.datePtkSelect = dataPtk;
    this.sendButton = false;

    this.service.getListApelAdmin(dataPtk).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.listApelModel = data.res;
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


  printForm2() {

    this.apelInfo = [];

    this.service.getApelInfo(this.selectedTableInfo['id']).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.apelInfo = data.res;

            this.visForm2 = 1;
            this.timer = global.setTimeout(function () {
              var innerContents = document.getElementById('printForm2').innerHTML;
              var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
              popupWinindow.document.open();
              popupWinindow.document.write('<html><head></head>' +
                '<body onload="window.print()">' + innerContents + '</html>');
              popupWinindow.document.close();
            }, 1000);



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


  printListApel() {

    this.singleApelInfo = [];
    this.service.getSingleApelInfo(this.selectedTableInfo['id']).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {

            this.singleApelInfo = data.res;
            this.timer = global.setTimeout(function () {
              var innerContents = document.getElementById('printForm').innerHTML;
              var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
              popupWinindow.document.open();
              popupWinindow.document.write('<html><head></head>' +
                '<body onload="window.print()">' + innerContents + '</html>');
              popupWinindow.document.close();
            }, 1000);

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

  reloadInfo() {
    this.errorMessage = '';
    if (this.datePtk != null) {
      this.getApelListDate(this.datePtk)
    } else {
      this.errorMessage = 'Нужно выбрать дату потока';
    }    
  }
  


}
