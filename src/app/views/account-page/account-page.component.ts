import {Component, OnInit} from "@angular/core";
import {AngularFire} from "angularfire2";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-account-page',
  templateUrl: 'account-page.component.html',
  styleUrls: ['account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  user: User = new User();
  authState: any;

  constructor(public af: AngularFire) {
  }

  ngOnInit() {
    this.af.auth.subscribe((state: any) => {
      this.authState = state;
      this.user.email = state.auth.email;
      this.user.uid = state.uid;
    });
  }

}
