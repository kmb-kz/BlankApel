import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  moduleId:module.id,
  selector: 'app-detail-table',
  templateUrl: 'detail-table.component.html',
  styleUrls: ['detail-table.component.css']
})
export class DetailTableComponent {
  
  preloaderText = 'Подождите. Идет загрузка данных...';

  @Input()
  value = [];

  @Input()
  tableFilter: Boolean;

  @Input()
  cols = [];
  
  @Output()
  onSelectedRow = new EventEmitter();  
  
 
  selectApel(info){
    this.onSelectedRow.next(info);
  }

}
