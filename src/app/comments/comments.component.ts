import { Component, Input, OnInit } from "@angular/core";
import { distanceInWords } from "date-fns";
import { Subscription } from "rxjs";
import { ImageService } from "src/Services/ServiceImage/images.service";
import { AuthService } from "src/Services/AuthService/auth.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  TableauCommentaire: any = [];
  private TableauSub: Subscription;
  submitting = false;
  inputValue = "";
  @Input() ImageTab;
  //Pseudo = this.auth.getPseudoDecodedToken();
  UrlPhotoActuel: any = this.auth.getPhotoDecodedToken();

  constructor(private imageService: ImageService, private auth: AuthService) {}

  GetCommentaire() {
    this.imageService.GetCommentaire(this.ImageTab.id_post).subscribe(res => {
      this.TableauCommentaire = res;
    });
  }

  EnvoieCommentaire(contenu: string, idPost: number) {
    if (contenu !== "") {
      this.imageService.EnvoieCommentaire(contenu, idPost);
    }
  }

  ngOnInit() {
    this.GetCommentaire();
    this.TableauSub = this.imageService.TableauMessage.subscribe(
      NouveauCommentaire => {
        this.TableauCommentaire.unshift(NouveauCommentaire);
      },
      err => {
        console.log(err);
      }
    );
    this.imageService.RecupLaPhoto().subscribe(
      res => {
        this.UrlPhotoActuel = res[0].url_photo;
      },
      err => {
        console.log(err);
      }
    );
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = "";
    setTimeout(() => {
      this.submitting = false;
      this.EnvoieCommentaire(content, this.ImageTab.id_post);
    }, 500);
  }
}
