import { Component, OnInit } from "@angular/core";
import { User } from "src/Model/User/user";
<<<<<<< HEAD
import { UserService } from "src/app/Services/UserService/user.service";
=======
import { AuthService } from "src/Services/AuthService/auth.service";
>>>>>>> origin

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  submitted = false;

  // on importe le model User qu'on a crée
  userModel = new User();

  _url = "http://localhost:3000/register";

  register() {
    this.submitted = true;
    this.authService.user_post_request(this.userModel, this._url).subscribe(
      // Subscribe car observable
      data => console.log("Succes !", data),
      error => console.log("Error !", error)
    );
  }
}
