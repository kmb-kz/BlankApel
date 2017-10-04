import { Component, Input,Output,EventEmitter } from '@angular/core';

@Component({
  moduleId:module.id,
  selector: 'app-table-operator',
  templateUrl: 'table-operator.component.html',
  styleUrls: ['table-operator.component.css']
})
export class TableOperatorComponent  {

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
