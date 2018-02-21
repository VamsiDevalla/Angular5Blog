import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

import { AppComponent } from '../../app.component';
import { HomeComponent } from '../../components/home/home.component';
import { NavComponent } from '../../components/nav/nav.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { LoginComponent } from '../../components/login/login.component';
import { PostComponent } from '../../components/post/post.component';
import { PostViewComponent } from '../../components/post-view/post-view.component';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { LogoutComponent } from '../../components/logout/logout.component';

const routes: Routes=[
  {path:'',component: HomeComponent},
  {path:'signup',component: SignupComponent},
  {path:'login',component: LoginComponent},
  {path:'posts',component: PostComponent,canActivate:[AuthGuard]},
  {path:'posts/:id',component: PostViewComponent,canActivate:[AuthGuard]},
  {path:'logout',component: LogoutComponent},
  {path:'**',component: NotFoundComponent},
]
@NgModule({
  exports:[
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class routerModule { }
