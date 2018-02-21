import { Component, OnInit, ViewChild,EventEmitter,Output,Input } from '@angular/core';
import { PostsService} from '../../services/posts.service'
import { Post } from '../../models/Post'
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @ViewChild('postForm') form : any
  @Input() post: Post
  @Input() isEditing: boolean = false
  @Output() newPost: EventEmitter<Post> = new EventEmitter()
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter()
   constructor(private PostsService: PostsService, private auth:AuthService) { }
 
   ngOnInit() {
     this.post = {
       title:"",
       body: "",
       createdBy:{
         id: this.auth.fetchUser()._id ,
         username : this.auth.fetchUser().Username
       },
       liked: false,
       showComment:false,
       comments:[],
       likes:[]
     }
   }
   onSubmit({value, valid}: {value: Post, valid: boolean}) {
     if(!valid){
       console.log('Form is not valid');
     } else {
       this.PostsService.sendPost(value).subscribe(post =>{
         this.newPost.emit(post)
       });
       this.form.reset();
     }
   }
   onEdit({value, valid}: {value: Post, valid: boolean}) {
     if(!valid){
       console.log('Form is not valid');
     } else {
       this.PostsService.updatePost(value).subscribe(post =>{
         this.isEditing = false
         this.updatedPost.emit(post)
         this.form.reset()
       });
       
     }
   }
 
 }