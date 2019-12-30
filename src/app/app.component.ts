import {Component, OnInit} from "@angular/core";
import {User} from "src/Model/User/user";
import {AuthService} from "src/Services/AuthService/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private authService: AuthService) {
  }

}


