import { StatComponent } from './stat/stat.component';
import { AdminClientComponent } from './admin-client/admin-client.component';
import { ClientSubjectComponent } from './client-subject/client-subject.component';
import { Routes } from '@angular/router';
import { OperatorComponent } from './operator/operator.component';
import { LoginComponent } from './login/login.component';
import { NctComponent } from './nct/nct.component';

export const routes:Routes = [
    { path: '', redirectTo: 'login',  pathMatch:"full" },
    { path: 'login', component:LoginComponent },
    { path: 'nct', component:NctComponent },
    { path: 'admin', component:AdminClientComponent },
    { path: 'operator', component:OperatorComponent },
    { path: 'client_subject', component:ClientSubjectComponent },
    { path: 'stat', component:StatComponent }
    
]


