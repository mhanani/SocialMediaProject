import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  constructor() {
  }

  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 0;
  ComVisible = false;
  @Input() ImageTab;
  TitreImage;
  DescriptionImage;
  ImagePath;

  showMessage() {
    this.ComVisible = !this.ComVisible;
  }

  Affichage() {
    this.TitreImage = this.ImageTab.post_titre;
    this.DescriptionImage = this.ImageTab.post_description;
    this.ImagePath = this.ImageTab.post_chemin;
  }

  // j'attribue les valeur du tableau image au élément des post-card
  ngOnInit() {
    this.Affichage();
  }
}
