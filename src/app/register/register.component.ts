import { Component, OnInit } from "@angular/core";
import { User } from "src/Model/User/user";
import { UserService } from "src/Services/UserService/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private _userService: UserService) {}

  ngOnInit() {}
  submitted = false;

  // on importe le model User qu'on a crée
  userModel = new User();

  _url = "http://localhost:3000/register";

  register() {
    this.submitted = true;
    this._userService.user_post_request(this.userModel, this._url).subscribe(
      // Subscribe car observable
      data => console.log("Succes !", data),
      error => console.log("Error !", error)
    );
  }
}
