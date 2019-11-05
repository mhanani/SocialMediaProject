import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ImageService} from '../Services/ServiceImage/images.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  UserName;
  tableauImage: any[] = [];
  private TableauSub: Subscription;

  constructor(private http: HttpClient, private imageService: ImageService) {
  }

  ngOnInit() {
    this.imageService.AffichageImages().subscribe(reponse => {
      console.log(reponse);
      this.tableauImage = reponse;
    });
    this.TableauSub = this.imageService.TableauUpdated
      .subscribe((NouveauPost) => {
        this.tableauImage.unshift(NouveauPost);
      });
  }

  ngOnDestroy() {
    this.TableauSub.unsubscribe();
  }
}
