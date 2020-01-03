import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./landing/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {PostCardComponent} from "./post-card/post-card.component";
import {AddPhotoComponent} from "./add-photo/add-photo.component";
import {NavbarComponent} from "./home/navbar.component";
import {AuthGuard} from "src/Services/AuthGuard/auth.guard";
import {MessageComponent} from "./message/message.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {path: "message", component: MessageComponent},
  {
    path: "home",
    component: NavbarComponent,
    children: [{path: "add-photo", component: AddPhotoComponent}],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
