import { Component, OnInit } from "@angular/core";
import { User } from "src/Model/User/user";
import { AuthService } from "src/Services/AuthService/auth.service";
import { NzMessageService } from "ng-zorro-antd";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {}
  submitted = false;

  createMessage(type: string): void {
    if (type == "error")
      this.message.create(type, "Invalid credentials. Please try again.");
    else this.message.create(type, "Registered successfuly.");
  }

  // on importe le model User qu'on a crée
  userModel = new User();

  _url = "http://localhost:3000/register";

  register() {
    this.submitted = true;
    this.authService.user_post_request(this.userModel, this._url).subscribe(
      // Subscribe car observable
      data => {
        this.router.navigateByUrl("/login");
        this.createMessage("success");
        console.log("Succes !", data);
      },
      error => {
        this.createMessage("error"); // print false
        console.log("Error !", error);
      }
    );
  }
}
