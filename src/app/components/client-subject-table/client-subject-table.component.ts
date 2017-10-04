import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-client-subject-table',
  templateUrl: 'client-subject-table.component.html',
  styleUrls: ['client-subject-table.component.css']
})
export class ClientSubjectTableComponent {

  clientId: number = 0;
  lang: number = 0;
  subject: number = 0;
  testType: number = 0;
  teacherName: string = '';
  isEnabled: boolean;

  preloaderText = 'Подождите. Идет загрузка данных...';

  @Input()
  value = [];

  @Input()
  tableFilter: Boolean;

  @Input()
  cols = [];

  @Output()  
  onSelectedRow = new EventEmitter();  
  
  onRowSelect(increased) {
        this.onSelectedRow.next(increased);
  }
}
