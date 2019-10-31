import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/Model/User/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  // On a crée un service pour pouvoir envoyer des données. Vu qu'on utilise des URL, on importe Http

  constructor(private _http: HttpClient) {}

  // La fonction pour envoyer les données
  user_post_request(user: User, url: string) {
    return this._http.post<any>(url, user);
  }
}
