import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _http: HttpClient) {
  }

  private readonly JWT_TOKEN = "token";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  jwtHelper = new JwtHelperService();

  user_post_request(value: any, url: string) {
    return this._http.post<any>(url, value);
  }

  user_profile_request(url: string) {
    return this._http.post<any>("", url);
  }

  public getToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public setToken(token: string) {
    try {
      localStorage.setItem(this.JWT_TOKEN, token);
    } catch (e) {
      console.log("Error localStorage : " + e);
    }
  }

  public removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getIdDecodedToken(): number {
    const decodedToken = this.jwtHelper.decodeToken(this.getToken());
    return decodedToken.id_user;
  }

  getPseudoDecodedToken(): string {
    const decodedToken = this.jwtHelper.decodeToken(this.getToken());
    return decodedToken.pseudo;
  }

  getPhotoDecodedToken(): string {
    const decodedToken = this.jwtHelper.decodeToken(this.getToken());
    return decodedToken.url_photo;
  }

  getTokenExpirationDate(): Date {
    const decoded = jwt_decode(this.JWT_TOKEN);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isMyTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.getToken());
  }

  public logout() {
    this.isAuthenticated() == false;
    this.removeToken();
  }
}
