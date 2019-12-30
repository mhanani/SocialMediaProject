import {Component, OnInit} from "@angular/core";
import {AuthService} from "src/Services/AuthService/auth.service";
import {User} from "src/Model/User/user";
import {HttpClient} from "@angular/common/http";
import {ImageService} from "src/Services/ServiceImage/images.service";
import {UploadFile} from 'ng-zorro-antd';
import {Router} from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private imageService: ImageService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  userModel = new User();
  IdUserCourant: string;
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
      err => {
      }
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
    this.imagePreviewDeux = '';
    this.fileList = [];
  }

  Ajouter() {
    const postData = new FormData();
    postData.append('image', this.fileList[0]);
    this.isVisibleDeux = false;
    this.imageService.EnvoieUneImageProfile(postData).subscribe(res => {
      this.ngOnInit();
      this.fileList = [];
      this.imagePreview = '';
    });
  }
}
