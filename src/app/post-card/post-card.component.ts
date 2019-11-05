import {Component, Input, OnInit} from '@angular/core';
import {ImageService} from '../Services/ServiceImage/images.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  constructor(private imageService: ImageService) {
  }

  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 0;
  valueMoyenne = 0;
  ComVisible = false;
  @Input() ImageTab;
  TitreImage;
  DescriptionImage;
  ImagePath;
  Votes: number;

  showMessage() {
    this.ComVisible = !this.ComVisible;
  }

  EnvoieRate(value) {
    if (value !== 0) {
      this.imageService.EnvoieRate(
        'http://localhost:3000/EnvoieRate/' + this.imageService.IdSession + '/postID/' + this.ImageTab.id_post, value).subscribe(res => {
        this.imageService.GetRate(this.ImageTab.id_post).subscribe(rep => {
          this.Votes = rep[1];
          this.valueMoyenne = rep[2].Somme / rep[1];
        });
      });
    }
  }

  Affichage() {
    this.TitreImage = this.ImageTab.post_titre;
    this.DescriptionImage = this.ImageTab.post_description;
    this.ImagePath = this.ImageTab.post_chemin;
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

  // j'attribue les valeur du tableau image au élément des post-card
  ngOnInit() {
    this.GetRateData();
    this.Affichage();
  }
}
