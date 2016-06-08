import {Page} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {NavController} from "../../../node_modules/ionic-angular/components/nav/nav-controller";
import {AuthService} from "../../providers/auth-service/auth-service";
import {ProfilePage} from "../profile/profile";

@Page({
    templateUrl: 'build/pages/home/home.html',
    providers: [AuthService]
})
export class HomePage {

    constructor(public nav:NavController, public service:AuthService) {
        this.service.loadUserCredentials();

        this.service.AuthToken.then(data => {
            if (data) {
                this.nav.setRoot(ProfilePage);
            }
        });
    }

    goToLoginPage() {
        this.nav.push(LoginPage);
    }

    goToRegisterPage() {
        this.nav.push(RegisterPage);
    }
}
