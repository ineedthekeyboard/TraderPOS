import {Component} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppModalContentComponent} from "./views/modal-component/modal.component";
import {AngularFire} from "angularfire2";

@Component({
   selector: 'app-root',
    moduleId: `${module.id}`,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'Super Spice Traders';
  authorized: any;

  constructor (private modalService: NgbModal,
               public af: AngularFire) {
    this.af.auth.subscribe(auth => this.authorized = (auth && !!auth.uid));

  }

  logout() {
    this.af.auth.logout()
  }
  openModal(): void {
      const modalRef = this.modalService.open(AppModalContentComponent);
      modalRef.componentInstance.name = 'World';
  }
}
