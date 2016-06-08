import { Page, NavController} from 'ionic-angular';
import { AuthService } from "../../providers/auth-service/auth-service";
import {ProfilePage} from "../profile/profile";

@Page({
    templateUrl: 'build/pages/login/login.html',
    providers: [AuthService]
})
export class LoginPage {
    credentials;

    constructor(public nav:NavController, public service:AuthService) {
        this.credentials = {
            email: '',
            password: ''
        }
    }

    doLogin(user) {
        this.service.login(user).then(data => {
            if (data) {
                this.nav.setRoot(ProfilePage);
            }
        });
    }
}
