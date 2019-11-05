import {Component, Input, OnInit} from '@angular/core';
import {distanceInWords} from 'date-fns';
import {ImageService} from '../Services/ServiceImage/images.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  TableauCommentaire: any = [];
  private TableauSub: Subscription;
  submitting = false;
  author: 'Han Solo';
  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
  inputValue = '';
  @Input() ImageTab;
  Pseudo = 'LADZ';

  constructor(private imageService: ImageService) {
  }

  GetCommentaire() {
    this.imageService.GetCommentaire(this.ImageTab.id_post).subscribe(res => {
      this.TableauCommentaire = res;
      console.log(this.TableauCommentaire);
    });
  }

  EnvoieCommentaire(pseudo: string, contenu: string, idPost: number) {
    if (contenu !== '') {
      this.imageService.EnvoieCommentaire(pseudo, contenu, idPost);
    }
  }

  ngOnInit() {
    this.GetCommentaire();
    this.TableauSub = this.imageService.TableauMessage
      .subscribe((NouveauCommentaire) => {
        this.TableauCommentaire.unshift(NouveauCommentaire);
      });
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.EnvoieCommentaire(this.Pseudo, content, this.ImageTab.id_post);
    }, 500);
  }
}
