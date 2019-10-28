import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post-card",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.scss"]
})
export class PostCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  tooltips = ["terrible", "bad", "normal", "good", "wonderful"];
  value = 0;
  time = new Date();
  ComVisible = false;

  showMessage() {
    this.ComVisible = !this.ComVisible;
  }
}
