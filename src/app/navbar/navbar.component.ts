import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  tableauDeDonnee: any[];
  UserName;
  selectedFile: File = null;

  constructor(private http: HttpClient) {}

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
  }

  OnFileSelected($event) {
    console.log($event.target.files[0].name);
    this.selectedFile = $event.target.files[0] as File;
  }

  OnUpload() {
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    console.log(fd);
    this.http
      .post("http://localhost:3000/Image", {
        commentaire: this.selectedFile.name
      })
      .subscribe(res => {
        console.log(res);
      });
  }
}
