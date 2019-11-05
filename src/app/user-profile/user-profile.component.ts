import {Component, OnInit} from '@angular/core';
import {ImageService} from '../Services/ServiceImage/images.service';
import {UserService} from '../Services/UserService/user.service';

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
  TableauImage: any[];
  nbPublication: number;
  nbAmis: number;
  pseudo: string;
  // promise.then(successCallback, failureCallback);
  gridStyle = {
    width: '100%',
    textAlign: 'center'
  };

  constructor(private imageService: ImageService, private userService: UserService) {
  }

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
    this.imageService.SupressionImage({chemin: this.imagePreview, nom: this.nomFichier, ext: this.extension}).subscribe(res => {
      this.Initiation();
    });
  }

  Modifier() {
    this.isVisible = false;
    this.imageService.ModificationImage(
      {titre: this.valueTitre, description: this.valueDescription, chemin: this.imagePreview}).subscribe(res => {
      this.Initiation();
    }, error => {
      console.log('une erreur' + error);
    });

  }


  Initiation() {
    this.userService.getData().subscribe(response => {
      this.nbPublication = response[0].nb_publications;
      this.nbAmis = response[0].nb_relations;
      this.pseudo = response[0].pseudo;
    });
    this.imageService.Profiles().subscribe(reponse => {
      this.TableauImage = reponse;
    });
  }

  Close() {
    this.isVisible = false;
  }

  ngOnInit() {
    this.Initiation();
  }
}
