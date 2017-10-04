import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-navbar-menu',
  templateUrl: 'navbar-menu.component.html',
  styleUrls: ['navbar-menu.component.css']
})
export class NavbarMenuComponent implements OnInit {

  displayOperator: boolean = false;
  displaySubject: boolean = false;

  idRole: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.idRole = parseInt(localStorage.getItem('id'));

  }

  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('info_user');
    localStorage.removeItem('id');
    sessionStorage.removeItem('code');
    this.router.navigate(['./']);
  }


}
