import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  TableauImage: any[] = [];
  TableauUpdated = new Subject<any[]>();
  TableauImageProfile: any[] = [];
  TableauImageProfileUpdated = new Subject<any[]>(); // le subject qui sera utilsé pour rentre la page prfile image dynamique
  IdSession = 1;

  constructor(private http: HttpClient) {
  }

  EnvoieUneImage(url: string, contenu) {
    this.http.post(url, contenu).subscribe(res => {
      const titre = res[0];
      const nom = res[1];
      const description = res[2];
      const extension = res[3];
      const chemin = res[4];
      const idUser = res[5];
      const post = {
        post_titre: titre,
        post_nom: nom,
        post_description: description,
        post_ext: extension,
        post_chemin: chemin,
        id_user: idUser
      };
      this.TableauImage.unshift(post);
      this.TableauUpdated.next(this.TableauImage);
    });
  }

  AffichageImage(url: string) {
    this.http.get<any[]>(url).subscribe(resultat => (
      this.TableauImage = resultat
    ));
  }

  ImagesProfiles(url: string) {
    this.http.get<any[]>(url).subscribe(resultat => (
      this.TableauImageProfile = resultat
    ));
  }

  // a modifier encore car pas la  bonne méthode
  ModificationImage(url: string, contenu) {
    this.http.post(url, contenu).subscribe(res => {
    });
    this.ImagesProfiles('http://localhost:3000/ImagesProfile/' + this.IdSession);
  }

  SupressionImage(url: string, contenu) {
    this.http.post(url, contenu).subscribe(res => {
    });
    this.ImagesProfiles('http://localhost:3000/ImagesProfile/' + this.IdSession);
  }
}
