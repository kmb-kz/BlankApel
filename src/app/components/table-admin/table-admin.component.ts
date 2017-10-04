import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-table-admin',
  templateUrl: 'table-admin.component.html',
  styleUrls: ['table-admin.component.css']
})
export class TableAdminComponent {

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
