import {Page, NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service/auth-service";
import {ProfilePage} from "../profile/profile";

/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/register/register.html',
  providers: [AuthService]
})
export class RegisterPage {
  user = {};

  constructor(public nav: NavController, public service:AuthService) {
    this.user = {
        name: '',
        email: '',
        password: '',
        gender: 'M',
        year: 18
    }
  }

  register(user) {
      this.service.register(user).then(data => {
          if (data) {
              this.nav.setRoot(ProfilePage);
          }
      });
  }
}
