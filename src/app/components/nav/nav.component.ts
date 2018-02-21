import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn:string
  subscription: Subscription;
  constructor(private auth:AuthService) {
    this.subscription = this.auth.sendLogin().subscribe(data => {
      this.isLoggedIn = data.loggedIn
       })
  }
  
  ngOnInit() {
    if(this.auth.checkLogin()=='true'){
      this.isLoggedIn= 'true'
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  logout(){
    this.auth.deleteCookie()
  }

}
