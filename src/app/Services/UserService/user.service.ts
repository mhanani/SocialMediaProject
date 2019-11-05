import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from 'src/Model/User/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserId = 2;

  constructor(private http: HttpClient) {
  }

  user_post_request(user: User, url: string) {
    return this.http.post<any>(url, user);
  }

  getData() {
    return this.http.get('http://localhost:3000/getdata/' + this.UserId);
  }
}
