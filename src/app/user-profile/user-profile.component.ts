import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  copyStr =
    "This is my description which I can edit only If I am the right user.";
  // Title

  listOfData = [
    {
      Abonne: 198,
      Abonnements: 256,
      Publications: 9
    }
  ];

  gridStyle = {
    width: "25%",
    textAlign: "center"
  };
  constructor() {}

  ngOnInit() {}
}
