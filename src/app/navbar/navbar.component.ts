import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ImageService} from '../Services/ServiceImage/images.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  tableauDeDonnee: any[];
  UserName;
  selectedFile: File = null;
  tableauImage: any[] = [];
  private TableauSub: Subscription;

  constructor(private http: HttpClient, private imageService: ImageService) {
  }


  recuparation() {
    return new Promise((resolve, reject) => {
      this.http
        .get<any[]>('http://localhost:3000/personne')
        .subscribe(resultat => (this.tableauDeDonnee = resultat));
      setTimeout(() => {
        resolve((this.UserName = this.tableauDeDonnee[0].name));
      }, 1000);
    });
  }

  OnFileSelected($event) {
    console.log($event.target.files[0].name);
    this.selectedFile = $event.target.files[0] as File;
  }

  OnUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    console.log(fd);
    this.http
      .post('http://localhost:3000/Images', {
        commentaire: this.selectedFile.name
      })
      .subscribe(res => {
        console.log(res);
      });
  }

  Initiation() {
    return new Promise(
      (resolve, reject) => {
        this.imageService.AffichageImage('http://localhost:3000/ImageRecuperer');
        setTimeout(
          () => {
            resolve(this.tableauImage = this.imageService.TableauImage);
          }, 1000
        );
      });
  }

  ngOnInit() {
    this.Initiation();
    this.TableauSub = this.imageService.TableauUpdated
      .subscribe((Tableau: any[]) => {
        console.log(Tableau);
        this.tableauImage = Tableau;
      });
  }
}
