import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { PostCardComponent } from "./post-card/post-card.component";
import { AddPhotoComponent } from "./add-photo/add-photo.component";
import { NavbarComponent } from "./navbar/navbar.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "user-profile",
    component: UserProfileComponent
  },
  {
    path: "post-card",
    component: PostCardComponent,
    children: [
      { path: "add-photo", component: AddPhotoComponent },
      { path: "navbar", component: NavbarComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
