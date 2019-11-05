import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from 'src/Model/User/user';
import {UserService} from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private _userService: UserService) {
  }

  ngOnInit() {
  }

  _url = 'http://localhost:3000/login';

  userModel = new User();

  login() {
    // envoie le usermodel.email & usermodel.password au server node à l'adresse spécifiée
    this._userService.user_post_request(this.userModel, this._url).subscribe(
      // Subscribe car observable
      data => console.log('Succes !', data),
      error => console.log('Error !', error)
    );
  }
}
