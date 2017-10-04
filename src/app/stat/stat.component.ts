import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId:module.id,
  selector: 'app-stat',
  templateUrl: 'stat.component.html',
  styleUrls: ['stat.component.css']
})
export class StatComponent implements OnInit {

  datePtkModel;
  dataPtk;
  statInfo;
  errorMessage:string='';
  constructor(private service:AppService) { }

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



  getStatInfo(datePtk){
    this.dataPtk = datePtk;
    this.statInfo = [];
    this.service.getStat(datePtk).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          
          if (data.errorCode == 0) {
            this.statInfo = data.res;
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
