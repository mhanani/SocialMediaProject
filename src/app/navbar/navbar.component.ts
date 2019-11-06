<<<<<<< HEAD
import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ImageService} from '../Services/ServiceImage/images.service';
=======
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
>>>>>>> origin

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

<<<<<<< HEAD
  constructor(private http: HttpClient, private imageService: ImageService) {
=======
  constructor(private http: HttpClient, private httpHeader: HttpHeaders) {}

  ngOnInit() {}

  recuparation() {
    return new Promise((resolve, reject) => {
      this.http
        .get<any[]>("http://localhost:3000/personne")
        .subscribe(resultat => (this.tableauDeDonnee = resultat));
      setTimeout(() => {
        resolve((this.UserName = this.tableauDeDonnee[0].name));
      }, 1000);
    });
>>>>>>> origin
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
