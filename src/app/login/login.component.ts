import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    isLogginIn: boolean = false;
    dataLoading: boolean = false;
    oblModel;
    raionModel;
    userModel;
    errorMessage: string = '';
    info_user;
    constructor(private service: AppService, private router: Router) { }


    ngOnInit() {
        let info_user = localStorage.getItem('info_user');
        this.oblModel = [];
        this.raionModel = [];
        this.userModel = [];
        this.service.getObl().subscribe(
            data => {

                if (data.status == 200) {

                    data = data.json();
                    if (data.errorCode == 0) {
                        this.oblModel = data.res;
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

    getRaionList(idObl) {
        this.raionModel = [];
        this.userModel = [];
        this.service.getRaion(idObl).subscribe(
            data => {
                if (data.status == 200) {
                    data = data.json();
                    if (data.errorCode == 0) {
                        this.raionModel = data.res;

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


    getUsersList(idObl, idRaion) {
        this.userModel = [];
        this.service.getUserList(idObl, idRaion).subscribe(
            data => {
                if (data.status == 200) {
                    data = data.json();
                    if (data.errorCode == 0) {
                        this.userModel = data.res;
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

    authUser(login, pass) {
        this.errorMessage = '';
        this.isLogginIn = false;
        this.dataLoading = true;
        this.service.authService(login, pass).subscribe(
            data => {

                if (data.status == 200) {
                    data = data.json();

                    localStorage.removeItem('login');
                    localStorage.removeItem('info_user');
                    localStorage.removeItem('id');
                    localStorage.setItem('login', login);
                    localStorage.setItem('id', data.res.id);
                    localStorage.setItem('info_user', data);
                    this.dataLoading = false;
                    if (data.res.id == 1){
                        this.router.navigate(['./nct']);
                    } 
                    if(data.res.id == 2){
                        this.router.navigate(['./admin']);
                    }
                    if(data.res.id == 3){
                        this.router.navigate(['./operator']);
                    }

                } else {
                    this.errorMessage = 'Что то не так ';
                }
            },
            error => {
                this.errorMessage = 'Что то не так';

                if (error.status == 401) {
                    this.errorMessage = 'Что то не так ';
                }
                if (error.status == 403) {
                    this.errorMessage = 'Что то не так ';
                } else if (error.status == 500) {
                    console.log(error);
                } else console.log(error);
            }

        )
    }

}
