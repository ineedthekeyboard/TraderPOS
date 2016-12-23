import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginMode: boolean = false;
  currentUser: User = new User();

  //replace all alerts with proper notification system
  constructor(public UserService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  createAccount(): void {
    this.UserService.createNewUser(this.currentUser).subscribe((User) => {
      debugger;
      if (User.isAuthorized) {
        this.router.navigate(['account']);
      }
    });
  }

  login(): void {
    if (!LoginPageComponent.validateEmail(this.currentUser.email)) {
      alert("Not a valid email.");
      this.currentUser.email = null;
      return;
    }
    this.UserService.loginUser(this.currentUser.email, this.currentUser.password).subscribe((User) => {
      if (User.isAuthorized) {
        this.router.navigate(['account']);
      }
    });

  }

  static validateEmail(email: string): boolean {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

}
