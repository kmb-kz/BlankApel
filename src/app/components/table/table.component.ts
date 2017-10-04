import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css']
})
export class TableComponent {

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
