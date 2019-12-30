import {Component, OnInit} from "@angular/core";
import {NzMessageService} from "ng-zorro-antd/message";
import {HttpClient} from "@angular/common/http";
import {UploadFile} from "ng-zorro-antd";
import {ImageService} from "src/Services/ServiceImage/images.service";
import axios from "axios";

@Component({
  selector: "app-add-photo",
  templateUrl: "./add-photo.component.html",
  styleUrls: ["./add-photo.component.scss"]
})
export class AddPhotoComponent implements OnInit {
  isConfirmLoading = false;
  isVisible = false;
  valueDescription: string;
  valueTitre: string;
  imagePreview: string;
  fileList = [];
  location: string;
  latation;
  lgnzzz;

  constructor(
    private message: NzMessageService,
    private http: HttpClient,
    private imageService: ImageService
  ) {
  }

  Event(event) {
    console.log(event);
    this.latation = event.coords.lat;
    this.lgnzzz = event.coords.lng;
  }

  ngOnInit(): void {
  }

  geocode(): void {
    var self = this;
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: this.location,
          key: "AIzaSyCf-NA1a6uAE7eC56xhgmrMdODR2Os6wI4"
        }
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data.results[0].geometry.location.lat);
        console.log(response.data.results[0].geometry.location.lng);
        let newLat = response.data.results[0].geometry.location.lat;
        let newLng = response.data.results[0].geometry.location.lng;

        console.log(newLat + " fdsfsdfsdf");
        self.latation = newLat;
        self.lgnzzz = newLng;
        console.log(self.latation + " - " + self.lgnzzz);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showModal(): void {
    this.isVisible = true;
  }

  // pour avoir toute les informations sur la photo
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    const reader = new FileReader();
    console.log(this.latation + "effectivement cela marche");
    console.log(this.lgnzzz);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.fileList[0]);
    return false;
  };

  // une fois que la personne aura appuyer sur envoyer
  handleOk(type: string): void {
    const postData = new FormData();
    postData.append("titre", this.valueTitre);
    postData.append("description", this.valueDescription);
    postData.append("image", this.fileList[0], this.valueTitre);
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isConfirmLoading = false;
      this.isVisible = false;
      this.imageService.EnvoieUneImage(postData);
      this.fileList = [];
      this.valueTitre = "";
      this.valueDescription = "";
      this.imagePreview = "";
      this.message.create(type, `Votre photo à bien été posté`);
    }, 1000);
  }

  // la fenetre pour fermer le modal
  handleCancel(): void {
    this.fileList = [];
    this.valueTitre = "";
    this.valueDescription = "";
    this.isVisible = false;
    this.imagePreview = "";
  }
}
