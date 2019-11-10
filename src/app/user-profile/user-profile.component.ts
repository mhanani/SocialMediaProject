import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/Services/AuthService/auth.service";
import { User } from "src/Model/User/user";
import { HttpClient } from "@angular/common/http";
import { ImageService } from "src/Services/ServiceImage/images.service";

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

        this.userModel.setPseudo(pseudo);

        console.log("Données récup : ");
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

  gridStyle = {
    width: "25%",
    textAlign: "center"
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
}
