import {Component, OnInit} from "@angular/core";
import {AngularFire} from "angularfire2";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginMode: boolean = false;
  email: string = "rlc120304@gmail.com";
  pass: string = "test1234";
  currentUser: User = {
    uid: null,
    email: null,
    password: null,
    passwordConfirm: null
  };

  //replace all alerts with proper notification system
  constructor(public  af: AngularFire,
              private router: Router) {
  }

  ngOnInit() {
  }

  createAccount(): void {
    if (this.currentUser.password !== this.currentUser.passwordConfirm) {
      alert("Passwords did not match");
      return;
    }
    // if (!this.validateEmail(this.currentUser.email)){
    //   alert("Not a valid email.");
    //   this.currentUser.email = null;
    //   return;
    // }
    this.af.auth.createUser({
      email: this.currentUser.email,
      password: this.currentUser.password
    }).catch(function (error) {
      // Handle Errors here.
      //let errorCode = error.code;
      let errorMessage = error.message;
      //if (errorCode == 'auth/weak-password') {
      //  alert('The password is too weak.');
      //} else {
      alert(errorMessage);
      //}
      console.log(error);
    }).then(results => {
      if (results && results.uid) {
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
    this.af.auth.login({email: this.currentUser.email, password: this.currentUser.password}).catch(function (error) {
      // Handle Errors here.
      //let errorCode = error.code;
      let errorMessage = error.message;
      //if (errorCode == 'auth/weak-password') {
      //  alert('The password is too weak.');
      //} else {
      alert(errorMessage);
      //}
      console.log(error);
    }).then(results => {
      if (results && results.uid) {
        this.router.navigate(['account']);
      }
    });
  }

  static validateEmail(email: string): boolean {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

}
