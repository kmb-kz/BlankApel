import { AppService } from './../app.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-client-subject',
  templateUrl: 'client-subject.component.html',
  styleUrls: ['client-subject.component.css']
})
export class ClientSubjectComponent implements OnInit {

  errorMessage: string = '';
  errorMessageDelete: string = '';
  subjectModel;
  langModel;
  clientSubjectModel;
  clientModel;
  displayAddClient: boolean = false;
  displayEditClient: boolean = false;
  displayDeleteClient: boolean = false;
  typeTestId: number = 1;
  selectedClient;
  fioExpertEdit: string = '';
  infoActiveEdit: boolean = false;
  idUserEdit: number = 0;
  clientID: number = 0;
  activeUser;
  deleteInfo: string = '';


  constructor(private http: Http, private sevice: AppService) { }

  showDialogAdd() {
    this.displayAddClient = true;
  }
  displayAddClientDialogClose() {
    this.displayAddClient = false;
  }
  showDialogEdit() {
    this.displayEditClient = true;
  }
  displayEditClientDialogClose() {
    this.displayEditClient = false;
  }
  showDialogDelete() {
    this.displayDeleteClient = true;
  }
  displayDeleteClientDialogClose() {
    this.displayDeleteClient = false;
  }

  onSelectedClient(dt) {
    this.errorMessageDelete = '';
    this.errorMessage = '';
    this.fioExpertEdit = dt.data.teacherName;
    this.idUserEdit = dt.data.id;
    this.clientID = dt.data.clientId;
    if (dt.data.isEnabled == 1) {
      this.infoActiveEdit = true;
    } else {
      this.infoActiveEdit = false;
    }
  }



  ngOnInit() {
    this.subjectModel = [];
    this.sevice.getSubjectList().subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.subjectModel = data.res;
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

    this.langModel = [];
    this.sevice.getLangList().subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.langModel = data.res;
          } else {
            this.errorMessage = data.errorMsgRus;
          }
        } else console.log(data);
      },
      error => {

        if (error.status == 403) {

        } else if (error.status == 500) {
          console.log(error);
        } else {
          this.errorMessage = error;
        }
      }
    )



    this.clientModel = [];
    this.sevice.getClientList().subscribe(
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


  getClientListTable(id) {
    this.clientID = id;
    this.clientSubjectModel = [];
    this.sevice.getClientSubjects(id).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.clientSubjectModel = data.res;
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


  addClientSubject(idClient, lang, subject, fio, infoActive) {
    this.errorMessage = '';
    if (infoActive == "on") {
      infoActive = 1
    } else {
      infoActive = 0
    }
    this.sevice.setClientSubject(idClient, lang, this.typeTestId, subject, fio, infoActive).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.displayAddClientDialogClose();
            this.getClientListTable(this.clientID);
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

  editClientSubject(fioEdit, infoActiveEdit) {        
    if (infoActiveEdit) { this.activeUser = 1; } else { this.activeUser = 0; }    
    this.sevice.updateClientSubject(this.idUserEdit, fioEdit, this.activeUser).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.displayEditClientDialogClose();
            this.getClientListTable(this.clientID);
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

  deleteClientSubject() {
    this.sevice.removeClientsubject(this.idUserEdit).subscribe(
      data => {
        if (data.status == 200) {
          data = data.json();
          if (data.errorCode == 0) {
            this.displayDeleteClientDialogClose();
            this.getClientListTable(this.clientID);
          } else {
            this.errorMessageDelete = data.errorMsgRus;
          }
        } else console.log(data);
      },
      error => {

        if (error.status == 403) {

        } else if (error.status == 500) {
          console.log(error);
        } else{ this.errorMessageDelete = error;}
      }
    )
  }





}
