import {AngularFire} from "angularfire2";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {User} from "../models/user.model";

@Injectable()
export class UserService {
  private UserObj: Subject<any> = new Subject();

  constructor(public AF: AngularFire) {
    this.AF.auth.subscribe(auth => {
      let newUser = new User();
      if (auth) {
        newUser.email = auth.auth.email;
        newUser.uid = auth.uid;
        newUser.isAuthorized = !!(auth && auth.uid);
      }
      this.UserObj.next(newUser);
    });
  }

  public getUserSubject(): Subject<User> {
    return this.UserObj;
  }

  public loginUser(email: string, password: string): Subject<User> {
    //todo ngfire login and a next on subscribe.
    this.AF.auth.login({email: email, password: password}).catch((error) => {
      let errorMessage = error.message;
      //this.handleErrors(errorMessage);
    });
    // This code is not needed when using the firebase as the subscription in the init will
    // always respond first. May need this if we use our own back end later.
    //.then((results)=>{
    //   //this.UserObj.next(results);
    // });
    return this.UserObj;
  }

  public logoutUser(): Subject<User> {
    let newUser = new User();
    this.AF.auth.logout();
    this.UserObj.next(newUser);
    return this.UserObj;
  }

  public createNewUser(newUserToCreate: User): Subject<User> {
    if (newUserToCreate.password !== newUserToCreate.passwordConfirm) {
      let errorMessage = 'Passwords do not match';
      //this.handleErrors(errorMessage);
      return;
    }
    this.AF.auth.createUser({
      email: newUserToCreate.email,
      password: newUserToCreate.password
    }).catch(function (error) {
      let errorMessage = error.message;
      alert(errorMessage);
    });
    // This code is not needed when using the firebase as the subscription in the init will
    // always respond first. May need this if we use our own back end later.
    // }).then(auth => {
    //   debugger;
    //   let newUser = new User();
    //   newUser.email = auth.auth.email;
    //   newUser.uid = auth.uid;
    //   newUser.isAuthorized = (auth && auth.uid)? true : false;
    //   this.UserObj.next(newUser);
    // });
    return this.UserObj;
  }

  public static handleErrors(err: any): void {
    alert(err);
  }
}
