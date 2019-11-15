import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {AuthService} from "../AuthService/auth.service";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  TableauUpdated = new Subject();
  TableauMessage = new Subject();
  IdSession = this.auth.getIdDecodedToken();

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  EnvoieUneImage(contenu) {
    console.log(this.IdSession);
    this.http
      .post("http://localhost:3000/Images/" + this.IdSession, contenu)
      .subscribe(res => {
        const titre = res[0];
        const nom = res[1];
        const description = res[2];
        const extension = res[3];
        const chemin = res[4];
        const idUser = res[5];
        const id_post = res[6].id_post;
        const url_photo_user = res[7].url_photo;
        const post = {
          post_titre: titre,
          post_nom: nom,
          post_description: description,
          post_ext: extension,
          post_chemin: chemin,
          id_user: idUser,
          id_post: id_post,
          url_photo_user: url_photo_user
        };
        this.TableauUpdated.next(post);
      });
  }

  AffichageImages(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/ImageRecuperer");
  }

  Profiles(): Observable<any[]> {
    return this.http.get<any[]>(
      "http://localhost:3000/ImagesProfile/" + this.IdSession
    );
  }

  // a modifier encore car pas la  bonne méthode
  ModificationImage(contenu) {
    return this.http.post(
      "http://localhost:3000/ModificationImage/" + this.IdSession,
      contenu
    );
  }

  SupressionImage(contenu) {
    return this.http.post(
      "http://localhost:3000/SupressionImage/" + this.IdSession,
      contenu
    );
  }

  ////////////////////////////////////////////////////////////// RATE
  EnvoieRate(url: string, value: number) {
    return this.http.post(url, {valeur: value});
  }

  GetRate(getIDImage: number) {
    return this.http.get(
      "http://localhost:3000/GetRate/" +
      this.IdSession +
      "/postID/" +
      getIDImage
    );
  }

  ////////////////////////////////////////////////////////////// Commentaire

  GetCommentaire(getIDImage: number) {
    return this.http.get(
      "http://localhost:3000/GetCommentaire/postID/" + getIDImage
    );
  }

  EnvoieCommentaire(contenu: string, idPost: number) {
    this.http
      .post(
        "http://localhost:3000/EnvoieCommentaire/id_user/" +
        this.IdSession +
        "/postID/" +
        idPost,
        {contenu}
      )
      .subscribe(res => {
        const Pseudo = res[2];
        const UrlPhoto = res[1];
        const Lecommentaire = res[0];
        const commentaires = {
          pseudo: Pseudo,
          url_photo: UrlPhoto,
          commentaire: Lecommentaire,
          created_date: new Date()
        };
        this.TableauMessage.next(commentaires);
      });
  }

  EnvoieUneImageProfile(contenu) {
    return this.http.post('http://localhost:3000/Images-Profile/' + this.IdSession, contenu);
  }
}
