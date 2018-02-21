import { Component, OnInit, ViewChild } from '@angular/core';
import {User} from '../../models/User'
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') form :any
  user: User
    constructor(private auth:AuthService,private route:Router) { }
  
    ngOnInit() {
      this.user = {
        Username:"",
        Password:"",
      }
    }
  
    signUp({value,valid}:{value:User,valid:boolean}){
      if(valid){
        this.auth.signup(value).subscribe(user =>{
          this.route.navigate(['/login'])
        })
      }else{
        this.route.navigate(['/signup'])
      }
    }
  
  }
  
