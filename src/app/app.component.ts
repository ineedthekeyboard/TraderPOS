import {Component} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppModalContentComponent} from "./views/modal-component/modal.component";
import {UserService} from "./services/user.service";
@Component({
   selector: 'app-root',
    moduleId: `${module.id}`,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'Super Spice Traders';
  authorized: any = false;

  constructor (private modalService: NgbModal,
               public UserService: UserService) {
    this.UserService.getUserSubject().subscribe(User => this.authorized = User.isAuthorized);
  }

  logout() {
    this.UserService.logoutUser();
  }
  openModal(): void {
      const modalRef = this.modalService.open(AppModalContentComponent);
      modalRef.componentInstance.name = 'World';
  }
}
