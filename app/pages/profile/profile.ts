import {Page, NavController} from 'ionic-angular';
import {MenuController} from "../../../node_modules/ionic-angular/components/menu/menu-controller";
import {AuthService} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";

/*
 Generated class for the ProfilePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/profile/profile.html',
    providers: [MenuController, AuthService]
})
export class ProfilePage {
    constructor(public nav:NavController, private menu:MenuController, public service:AuthService) {
    }

    toggleMenu() {
        this.menu.toggle();
    }

    logout() {
        this.service.logout();
        this.nav.setRoot(HomePage);
    }
}
