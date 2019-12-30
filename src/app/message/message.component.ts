import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../Services/AuthService/auth.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions: any = [];
  pseudoArray: any = [];
  TableauMessage: Array<{ pseudo: string; message: string; }> = [];
  submitting = false;
  inputValue = "";
  PseudoUserTwo;
  selectValeur;

  //UrlPhotoActuel = this.auth.getPhotoDecodedToken();

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit() {
    const children: Array<{ label: string; value: string }> = [];
    this.http.get("http://localhost:3000/PseudoGather").subscribe(res => {
      this.pseudoArray = res;
      for (let i = 0; i < this.pseudoArray.length; i++) {
        children.push({label: this.pseudoArray[i].pseudo, value: this.pseudoArray[i].pseudo});
      }
    });
    this.listOfOption = children;
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = "";
    setTimeout(() => {
      this.submitting = false;
      this.TableauMessage.push({
        pseudo: this.auth.getPseudoDecodedToken(),
        message: content
        //imagePath: this.auth.getPhotoDecodedToken()
      });
      this.http.post("http://localhost:3000/EnvoieMessage/id_user_one/"
        + this.auth.getIdDecodedToken() + "/pseudo_user_two/" + this.PseudoUserTwo, {content})
        .subscribe();
    }, 100);
  }

  pseudoSelect(pseudo) {
    this.PseudoUserTwo = pseudo;
    this.http.get("http://localhost:3000/GatherMessager/id_user_one/"
      + this.auth.getIdDecodedToken() + "/pseudo_user_two/" + this.PseudoUserTwo).subscribe(res => {
      this.listOfTagOptions = res;
      this.TableauMessage = [];
      for (let i = 0; i < this.listOfTagOptions.length; i++) {
        this.TableauMessage.push({
          pseudo: this.listOfTagOptions[i].pseudo,
          message: this.listOfTagOptions[i].content_message
          //imagePath: this.listOfTagOptions[i].url_photo
        });
      }
    });
  }
}
