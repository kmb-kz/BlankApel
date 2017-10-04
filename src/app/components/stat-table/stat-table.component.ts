import { Component, Input } from '@angular/core';

@Component({
  moduleId:module.id,
  selector: 'app-stat-table',
  templateUrl: 'stat-table.component.html',
  styleUrls: ['stat-table.component.css']
})
export class StatTableComponent{

  @Input()
  value=[]
}
