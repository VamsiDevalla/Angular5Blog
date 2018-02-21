import { Component, OnInit, ViewChild } from '@angular/core';
import {User} from '../../models/User'
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') form: any
  user: User
  
  constructor(private auth: AuthService,private rout: Router) { }
  
    ngOnInit() {
      this.user = {
        Username:'',
        Password:'',
      }
    }
    login({value,valid}:{value:User,valid:boolean}){
      if(valid){
        this.auth.login(value)
      }else{
        this.form.reset()
      }
    }
}
