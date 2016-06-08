import {Injectable} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
    LOGIN_URL: string = "http://apivegas-julianosilva.rhcloud.com/auth/signin";
    REGISTER_URL: string = "http://apivegas-julianosilva.rhcloud.com/auth/signup";
    INFO_URL: string = "http://apivegas-julianosilva.rhcloud.com/auth/info";

    jwtHelper: JwtHelper = new JwtHelper();
    local: Storage = new Storage(LocalStorage);

    isLoggedin;
    AuthToken;

    constructor(private http: Http) {
        this.isLoggedin = false;
        this.AuthToken = null;
    }

    storeUserCredentials(token) {
        this.local.set('vegastoken', token);
        this.useCredentials(token);
    }

    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }

    loadUserCredentials() {
        var token = this.local.get('vegastoken');
        this.useCredentials(token);
    }

    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        this.local.clear();
    }

    login(credentials) {
        return new Promise(resolve => {
            this.http.post(this.LOGIN_URL, JSON.stringify(credentials)).subscribe(data => {
                if(data.json().success){
                    this.storeUserCredentials(data.json().token);
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }

    register(user) {
        return new Promise(resolve => {
            this.http.post(this.REGISTER_URL, JSON.stringify(user)).subscribe(data => {
                if(data.json().data.success){
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }

    getinfo() {
        return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            headers.append('Authorization', 'JWT ' + this.AuthToken);

            this.http.get(this.INFO_URL, {headers: headers}).subscribe(data => {
                if(data.json().success)
                    resolve(data.json());
                else
                    resolve(false);
            });
        })
    }

    logout() {
        this.destroyUserCredentials();
    }
}

