import {Component, OnInit} from '@angular/core';
import {Data, Router} from '@angular/router';
import {AuthService} from '../../Services/AuthService/auth.service';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  center = "center";
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
  }

  listOfData: Data[] = [
    {
      name: 'Jim',
      prenom: 'Red',
      pseudo: 'jimmy_red',
      age: 32,
      address: 'jimmy@jimmy'
    }
  ];
  listOfDisplayData = [...this.listOfData];
  mapOfSort: { [key: string]: string | null } = {
    name: null,
    prenom: null,
    pseudo: null,
    age: null,
    address: null
  };

  DeleteUser(pseudo): void {
    const _url = "http://localhost:3000/deleteUser";
    const user_pseudo = pseudo;
    this.auth.user_post_request({user_pseudo}, _url).subscribe(
      res => {
        this.listOfDisplayData = [...res];
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    const url = 'http://localhost:3000/admin';
    this.auth.user_post_request('', url).subscribe(
      res => {
        this.listOfDisplayData = [...res];
      }, error => {
        console.log(error);
      }
    );
  }
}
