import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "src/Model/User/user";
import { Observable } from "rxjs";
import { AuthService } from "src/Services/AuthService/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.authService.isAuthenticated() == false;
  }

  response: Observable<any>;

  _url = "http://localhost:3000/login";

  userModel = new User();

  login() {
    this.authService.removeToken();
    // envoie le usermodel.email & usermodel.password au server node à l'adresse spécifiée
    this.authService.user_post_request(this.userModel, this._url).subscribe(
      // Subscribe car observable
      res => {
        const token = res.token;
        this.authService.setToken(token); // bizarre parce que j'appelle cette fonction nul part mais il sait quand même faire getToken dans le HttpInterceptor
        //console.log("isAuthenticated ? : " + this.authService.isAuthenticated()); // print true
      },
      error => {
        console.log("Error !", error),
          console.log(
            "isAuthenticated ? : " + this.authService.isAuthenticated()
          ); // print false
      }
    );
  }
}
