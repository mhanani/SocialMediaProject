import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AuthService } from "src/Services/AuthService/auth.service";
import { User } from "src/Model/User/user";
import { HttpClient } from "@angular/common/http";
import { ImageService } from "src/Services/ServiceImage/images.service";
import { UploadFile } from "ng-zorro-antd";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM.js";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private imageService: ImageService,
    private http: HttpClient
  ) {}

  userModel = new User();

  _url = "http://localhost:3000/user-profile/" + this.auth.getIdDecodedToken();

  ngOnInit() {
    this.imageService.Profiles().subscribe(reponse => {
      this.TableauImage = reponse;
    });
    this.http.get(this._url).subscribe(
      res => {
        console.log(res[0].pseudo);
        var user = res[0].nom;
        var prenom = res[0].prenom;
        var age = res[0].age;
        var email = res[0].email;
        var nbPublication = res[0].nb_publications;
        var nbAmis = res[0].nb_relations;
        var pseudo = res[0].pseudo;
        var userPhoto = res[0].url_photo;
        this.userModel.setPseudo(pseudo);
        this.userModel.setNbPublication(nbPublication);
        this.userModel.setUserPhoto(userPhoto);
      },
      err => {}
    );
  }

  copyStr =
    "This is my description which I can edit only If I am the right user.";
  // Title
  isVisible = false;
  imagePreview = "";
  valueTitre = "";
  valueDescription = "";
  extension: string;
  nomFichier: string;
  TableauImage: any[];
  nbPublication: number;
  nbAmis: number;
  pseudo: string;
  userPhoto: string;
  imagePreviewDeux;
  isVisibleDeux = false;
  fileList = [];
  isFirstVisibleMiddle = false;
  isPseudoVisibleMiddle = false;
  isPasswordVisibleMiddle = false;
  isEmailVisibleMiddle = false;
  value_new_pseudo: string;
  value_new_email: string;
  value_new_password: string;
  map: Map;
  view: View;

  showModalMiddle(): void {
    this.isFirstVisibleMiddle = true;
  }
  handleOkMiddle(): void {
    if (this.isPseudoVisibleMiddle) {
      this._url =
        "http://localhost:3000/user-profile/" +
        this.auth.getIdDecodedToken() +
        "/UpdatePseudo";
      this.auth
        .user_post_request({ pseudo: this.value_new_pseudo }, this._url)
        .subscribe(
          res => {
            console.log("Modification effectuée : " + res);
          },
          error => {
            console.log("Erreur : modification non effectuée  - " + error);
          }
        );
      console.log(this.value_new_pseudo);
      console.log(this._url);
      this._url =
        "http://localhost:3000/user-profile/" + this.auth.getIdDecodedToken();
    }
    if (this.isEmailVisibleMiddle) {
      this._url =
        "http://localhost:3000/user-profile/" +
        this.auth.getIdDecodedToken() +
        "/UpdateEmail";
      this.auth
        .user_post_request({ email: this.value_new_email }, this._url)
        .subscribe(
          res => {
            console.log("Modification effectuée : " + res);
          },
          error => {
            console.log("Erreur : modification non effectuée  - " + error);
          }
        );
      console.log(this.value_new_email);
      console.log(this._url);
      this._url =
        "http://localhost:3000/user-profile/" + this.auth.getIdDecodedToken();
    }
    if (this.isPasswordVisibleMiddle) {
      this._url =
        "http://localhost:3000/user-profile/" +
        this.auth.getIdDecodedToken() +
        "/UpdatePassword";
      this.auth
        .user_post_request({ password: this.value_new_password }, this._url)
        .subscribe(
          res => {
            console.log("Modification effectuée : " + res);
          },
          error => {
            console.log("Erreur : modification non effectuée - " + error);
          }
        );
      console.log(this.value_new_password);
      console.log(this._url);
      this._url =
        "http://localhost:3000/user-profile/" + this.auth.getIdDecodedToken();
    }
    this.isFirstVisibleMiddle = false;
    this.isPseudoVisibleMiddle = false;
    this.isEmailVisibleMiddle = false;
    this.isPasswordVisibleMiddle = false;
  }
  handleCancelMiddle(): void {
    this.isFirstVisibleMiddle = false;
    this.isPseudoVisibleMiddle = false;
    this.isEmailVisibleMiddle = false;
    this.isPasswordVisibleMiddle = false;
  }

  PseudoSelected(): void {
    this.isFirstVisibleMiddle = false;
    this.isPseudoVisibleMiddle = true;
  }
  PasswordSelected(): void {
    this.isFirstVisibleMiddle = false;
    this.isPasswordVisibleMiddle = true;
  }
  EmailSelected(): void {
    this.isFirstVisibleMiddle = false;
    this.isEmailVisibleMiddle = true;
  }

  gridStyle = {
    width: "25%",
    textAlign: "center"
  };

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewDeux = reader.result as string;
    };
    reader.readAsDataURL(this.fileList[0]);
    return false;
  };

  checkIcon(Image) {
    this.isVisible = true;
    this.valueTitre = Image.post_titre;
    this.valueDescription = Image.post_description;
    this.imagePreview = Image.post_chemin;
    this.extension = Image.post_ext;
    this.nomFichier = Image.post_nom;
  }

  Supprimer() {
    this.isVisible = false;
    this.imageService
      .SupressionImage({
        chemin: this.imagePreview,
        nom: this.nomFichier,
        ext: this.extension
      })
      .subscribe(res => {
        this.ngOnInit();
      });
  }

  Modifier() {
    this.isVisible = false;
    this.imageService
      .ModificationImage({
        titre: this.valueTitre,
        description: this.valueDescription,
        chemin: this.imagePreview
      })
      .subscribe(
        res => {
          this.ngOnInit();
        },
        error => {
          console.log("une erreur" + error);
        }
      );
  }

  Close() {
    this.isVisible = false;
  }

  Fermer() {
    this.isVisibleDeux = false;
    this.imagePreviewDeux = "";
    this.fileList = [];
  }

  Ajouter() {
    const postData = new FormData();
    postData.append("image", this.fileList[0]);
    this.isVisibleDeux = false;
    this.imageService.EnvoieUneImageProfile(postData).subscribe(res => {
      this.ngOnInit();
      this.fileList = [];
      this.imagePreview = "";
    });
  }
}
