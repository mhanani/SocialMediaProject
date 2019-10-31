import {Component, OnInit} from '@angular/core';
import {ImageService} from '../Services/ServiceImage/images.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  copyStr = 'This is my description which I can edit only If I am the right user.';
  isVisible = false;
  imagePreview = '';
  valueTitre = '';
  valueDescription = '';
  extension: string;
  nomFichier: string;

  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };
  TableauImage: any[] = [];

  constructor(private imageService: ImageService) {
  }

  Initiation() {
    return new Promise(
      (resolve, reject) => {
        this.imageService.ImagesProfiles('http://localhost:3000/ImagesProfile/' + this.imageService.IdSession);
        setTimeout(
          () => {
            resolve(this.TableauImage = this.imageService.TableauImageProfile);
          }, 1000
        );
      });
  }

  checkIcon(Image) {
    this.isVisible = true;
    this.valueTitre = Image.post_titre;
    this.valueDescription = Image.post_description;
    this.imagePreview = Image.post_chemin;
    this.extension = Image.post_ext;
    this.nomFichier = Image.post_nom;
  }

  //faire la methode supprimer et modifier avec des subject pour rendrer ca dynamqiue
  // méthode supprimer nécessiter d'appuyer deux fois sur la touche supprimer pour supprimer l'item, arrang ca avec un subject
  Supprimer() {
    this.isVisible = false;
    this.imageService.SupressionImage(
      'http://localhost:3000/SupressionImage/' + this.imageService.IdSession,
      {chemin: this.imagePreview, nom: this.nomFichier, ext: this.extension});
    this.Initiation();
  }

  Modifier() {
    this.isVisible = false;
    this.imageService.ModificationImage('http://localhost:3000/ModificationImage/' + this.imageService.IdSession,
      {titre: this.valueTitre, description: this.valueDescription, chemin: this.imagePreview});
    this.Initiation();
  }

  Close() {
    this.isVisible = false;
  }

  ngOnInit() {
    // j'appel tout les images du type où l'id user est égal à un
    this.Initiation();
  }
}
