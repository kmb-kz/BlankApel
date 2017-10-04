import { AppService } from './app.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OperatorComponent } from './operator/operator.component';
import { NctComponent } from './nct/nct.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { DataTableModule, SharedModule, DialogModule } from 'primeng/primeng';
import { NavbarMenuComponent } from './components/navbar-menu/navbar-menu.component';
import { ClientSubjectComponent } from './client-subject/client-subject.component';
import { ClientSubjectTableComponent } from './components/client-subject-table/client-subject-table.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { AdminClientComponent } from './admin-client/admin-client.component';
import { TableAdminComponent } from './components/table-admin/table-admin.component';
import { TableOperatorComponent } from './components/table-operator/table-operator.component';
import { DetailTableComponent } from './components/detail-table/detail-table.component';
import { StatComponent } from './stat/stat.component';
import { StatTableComponent } from './components/stat-table/stat-table.component';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, OperatorComponent,
    NctComponent, NavbarComponent, TableComponent,
    NavbarMenuComponent, ClientSubjectComponent,
    ClientSubjectTableComponent, PreloaderComponent, AdminClientComponent, 
    TableAdminComponent, TableOperatorComponent,
    DetailTableComponent, StatComponent, StatTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true, }),
    DataTableModule, SharedModule, DialogModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
