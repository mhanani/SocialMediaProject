import { Component, OnInit } from "@angular/core";
import { distanceInWords } from "date-fns";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  data: any[] = [];
  submitting = false;
  user = {
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  };
  inputValue = "";

  constructor() {}

  ngOnInit() {}

  handleSubmit(): void {}
}
