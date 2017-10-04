import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { Router } from '@angular/router';
import { DataTableModule, SharedModule, DialogModule } from 'primeng/primeng';


@Component({
  moduleId: module.id,
  selector: 'app-nct',
  templateUrl: 'nct.component.html',
  styleUrls: ['nct.component.css'],

})
export class NctComponent implements OnInit {
  errorMessage = '';
  errorMessageCorrect: string = '';
  errorMessageApelRep: string = '';
  datePtkModel;
  datePtk;
  listApelModel;
  idPackageApel;
  listPackageApel;
  info;apelInfo;  
  clientModel;
  packageApelId: number = 0;
  timer: NodeJS.Timer;
  dataCols = [
    { field: 'idTestOrg', header: '№ ВУЗ' },
    { field: 'nameTestOrg', header: 'Наименование ВУЗа' },
    { field: 'period', header: 'Поток' },
    { field: 'importDate', header: 'Дата/Время принятия' },
    { field: 'sendDate', header: 'Дата/Время отправки' },
    { field: 'finish', header: 'Кол-во готов' },
    { field: 'noRaspr', header: 'Не распред' },
    { field: 'raspr', header: 'Распред' },
    { field: 'finish', header: 'хз %' }
  ]

  constructor(private service: AppService, private router: Router) { }

  ngOnInit() {
    let info_user = localStorage.getItem('info_user');

    if (info_user != null) {
      if (localStorage.getItem('id') == '1') {
        this.router.navigate(['./nct']);
      }
      if (localStorage.getItem('id') == '2') {
        this.router.navigate(['./ppent']);
      }
      if (localStorage.getItem('id') == '3') {
        this.router.navigate(['./operator']);
      }
    }
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

    this.clientModel = [];
    this.service.getClientList().subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.clientModel = data.res;
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

  getApelListDate(dataPtk) {
    this.datePtk = dataPtk;
    this.listApelModel = [];
    this.service.getListApel(dataPtk).subscribe(
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

  onSelectedApel(info) {
    alert("a");
    this.errorMessageApelRep = '';
    this.service.repApel(info.id).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.listPackageApel = [];
            this.onSelectedClient(this.packageApelId);
          } else {
            this.errorMessageApelRep = data.errorMsgRus;
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
    this.errorMessageApelRep = '';
    if (this.datePtk != null) {
      this.getApelListDate(this.datePtk);
    } else {
      this.errorMessageApelRep = 'Нужно выбрать дату потока';
    }
  }

  sendApelPackage() {
    this.errorMessage = '';
    this.errorMessageCorrect = '';
    this.service.sendApelPackage(this.packageApelId).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {            
            this.errorMessageCorrect = 'Данные успешно отправлены';            
           
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


  onSelectedClient(dt) {
    console.log(this.clientModel)
    this.info = dt.data;
    this.packageApelId = dt.data.id
    this.listPackageApel = []
    this.service.getDetailPackageApel(dt.data.id).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.listPackageApel = data.res;
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

   printApelPackageNCT(clientId) {
    this.apelInfo = [];
    this.service.printNCT(this.packageApelId, clientId).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.apelInfo = data.res;           
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







}