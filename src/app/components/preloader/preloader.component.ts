import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-preloader',
  templateUrl: 'preloader.component.html',
  styleUrls: ['preloader.component.css']
})
export class PreloaderComponent {
  @Input()
  captionText: String;
}
