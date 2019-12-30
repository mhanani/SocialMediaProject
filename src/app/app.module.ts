import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
// Pages
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AddPhotoComponent } from "./add-photo/add-photo.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CommentsComponent } from "./comments/comments.component";
import { PostCardComponent } from "./post-card/post-card.component";
// Librairies
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzCardModule } from "ng-zorro-antd/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NgZorroAntdModule, NZ_I18N, fr_BE } from "ng-zorro-antd";
import { registerLocaleData } from "@angular/common";
import fr from "@angular/common/locales/fr";
import { MatSelectModule, MatSidenavModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { TokenInterceptorService } from "src/Services/TokenInterceptor/token-interceptor.service";
import { AuthService } from "src/Services/AuthService/auth.service";
import { AuthGuard } from "src/Services/AuthGuard/auth.guard";
import { AgmCoreModule } from "@agm/core";

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    AddPhotoComponent,
    NavbarComponent,
    CommentsComponent,
    PostCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NzAvatarModule,
    NzCardModule,
    MatGridListModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    MatSelectModule,
    MatSidenavModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCf-NA1a6uAE7eC56xhgmrMdODR2Os6wI4"
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: fr_BE },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
