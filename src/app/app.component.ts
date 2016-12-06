import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppModalContentComponent} from './views/modal-component/modal.component';

@Component({
   selector: 'app-root',
    moduleId: `${module.id}`,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent {
  title = 'Super Spice Traders';
  constructor (
      private modalService: NgbModal
  ) {}
  openModal(): void {
      const modalRef = this.modalService.open(AppModalContentComponent);
      modalRef.componentInstance.name = 'World';
  }
}
