<<<<<<< HEAD
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AddPhotoComponent} from './add-photo/add-photo.component';
import {NavbarComponent} from './navbar/navbar.component';
=======
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { PostCardComponent } from "./post-card/post-card.component";
import { AddPhotoComponent } from "./add-photo/add-photo.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthGuard } from "src/Services/AuthGuard/auth.guard";
>>>>>>> origin

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
<<<<<<< HEAD
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    children: [
      {path: 'add-photo', component: AddPhotoComponent},
    ]
=======
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "navbar",
    component: NavbarComponent,
    children: [{ path: "add-photo", component: AddPhotoComponent }]
>>>>>>> origin
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
