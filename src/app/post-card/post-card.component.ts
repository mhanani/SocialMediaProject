import {Component, Input, OnInit} from "@angular/core";
import {ImageService} from "src/Services/ServiceImage/images.service";
import {AuthService} from "../../Services/AuthService/auth.service"
import {Router} from "@angular/router";

@Component({
  selector: "app-post-card",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.scss"]
})
export class PostCardComponent implements OnInit {
  constructor(private imageService: ImageService, private auth: AuthService, private router: Router) {
  }

  tooltips = ["terrible", "bad", "normal", "good", "wonderful"];
  idUserCourant;
  value = 0;
  valueMoyenne = 0;
  ComVisible = false;
  @Input() ImageTab;
  TitreImage;
  DescriptionImage;
  ImagePath;
  Votes: number;
  UrlPhotoUser;
  IdUser: number;
  location: String;

  showMessage() {
    this.ComVisible = !this.ComVisible;
  }

  EnvoieRate(value) {
    if (value !== 0) {
      this.imageService
        .EnvoieRate(
          "http://localhost:3000/EnvoieRate/" +
          this.auth.getIdDecodedToken() +
          "/postID/" +
          this.ImageTab.id_post,
          value
        )
        .subscribe(res => {
          this.imageService.GetRate(this.ImageTab.id_post).subscribe(rep => {
            this.Votes = rep[1];
            this.valueMoyenne = rep[2].Somme / rep[1];
          });
        });
    }
  }

  Affichage() {
    this.IdUser = this.ImageTab.id_user;
    this.TitreImage = this.ImageTab.post_titre;
    this.DescriptionImage = this.ImageTab.post_description;
    this.ImagePath = this.ImageTab.post_chemin;
    this.UrlPhotoUser = this.ImageTab.url_photo_user;
    this.location = this.ImageTab.post_location;
    this.idUserCourant = this.auth.getIdDecodedToken();
  }

  GetRateData() {
    this.imageService.GetRate(this.ImageTab.id_post).subscribe(res => {
      if (res[0] !== null) {
        this.value = res[0].rate_given;
        this.Votes = res[1];
        this.valueMoyenne = res[2].Somme / res[1];
      }
    });
  }

  redirection(IdUser: number) {
    //this.router.navigate(["/user-profile/" + IdUser]);
  }

  // j'attribue les valeur du tableau image au élément des post-card
  ngOnInit() {
    this.GetRateData();
    this.Affichage();
    console.log(this.idUserCourant + "----" + this.IdUser);
  }
}
