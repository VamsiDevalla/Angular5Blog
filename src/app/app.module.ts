import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { routerModule } from './routers/router/router.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PostViewComponent } from './components/post-view/post-view.component';

import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';

import { AuthGuard } from './guards/auth.guard';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostFormComponent,
    NavComponent,
    SignupComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    LogoutComponent,
    PostViewComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    routerModule,
    FormsModule,
    HttpClientModule,
    routerModule,
  ],
  providers: [AuthService, PostsService, AuthGuard,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
