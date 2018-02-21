import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {User} from '../models/User'
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  private subject = new Subject<any>();

  constructor(private http: HttpClient, private route:Router,private cookies: CookieService) {
   }
  login(user:User){
    this.http.post<any>("http://localhost:2000/login",user).subscribe(data=>{
     if(data.loggedIn==true) {
       this.cookies.set('loggedIn', data.loggedIn);
       this.cookies.set('m_token', data.token);
       this.cookies.set('user', JSON.stringify(data.user));
       this.subject.next({ loggedIn: this.checkLogin()});
       this.route.navigate(['/posts'])
     } else {
       this.route.navigate(['/login']);
     }  
   })
  }
 
  checkLogin() {
      return this.cookies.get('loggedIn') 
  }
  
    
  sendLogin():Observable<any> {
    return this.subject.asObservable();
  }
  
 fetchUser():User{
   return JSON.parse(this.cookies.get('user'))
 }
 
 fetchToken() {
   return this.cookies.get('m_token');
 }
 
 deleteCookie(){
    this.cookies.deleteAll()
    this.route.navigate(['/login'])
    this.subject.next({ loggedIn: this.checkLogin()});
 }
 
  signup(user:User):Observable<User>{
    return this.http.post<User>("http://localhost:2000/signup",user)
  }

}
