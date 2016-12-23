import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-account-page',
  templateUrl: 'account-page.component.html',
  styleUrls: ['account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  user: User = new User();

  constructor(public UserService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.UserService.getUserSubject().subscribe((user: User) => {
      if (User) {
        this.user = user;
      } else {
        this.router.navigate(['login']);
      }
    });
  }

}
