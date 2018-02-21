import { Component, OnInit } from '@angular/core';
import { PostsService} from '../../services/posts.service'
import { Post } from '../../models/Post'
import {AuthService} from '../../services/auth.service'
import { User } from '../../models/User';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  showFormButton:string
  show = false
  posts: Post[]
  isEditing: Boolean 
  currentPost: Post
  currentUser: User

  constructor(private PostsService: PostsService,private auth:AuthService) { }

  ngOnInit() {
    this.showFormButton = "Add Post"
    this.currentUser = this.auth.fetchUser()
    this.PostsService.getPosts().subscribe(posts => {
      this.posts = posts
      this.setLikedNhideComment()
    })
  }

  showForm(){
    this.show=!this.show
    if(this.show)
    this.showFormButton = "Hide post form"
    else
    this.showFormButton = "Add Post"
  }

  setLikedNhideComment(){
    let len= this.posts.length
    for(var i=0;i<len;i++){
      let post=this.posts[i],
          len = post.likes.length
          post.liked = false
          post.showComment = false
      for(let j=0;j<len;j++){
        if(post.likes[j].author==this.currentUser._id){
          post.liked = true 
        }
      }
    }
  }

  onNewPost(post : Post){
    this.posts.unshift(post)
  }

  newComment(post : Post){
    this.PostsService.getPosts().subscribe(posts => {
      this.posts = posts
      this.setLikedNhideComment()
    })
  }

  onUpdatedPost(post:Post){
    this.show=false
    this.isEditing = false
    this.PostsService.getPosts().subscribe(posts => {
      this.posts = posts
      this.setLikedNhideComment()
    })
  }

  removePost(post: Post){
    if(confirm('are you sure?')){
      this.PostsService.removePost(post).subscribe(()=>{
        this.PostsService.getPosts().subscribe(posts => {
          this.posts = posts
          this.setLikedNhideComment()
        })
      })
    }
  }

  editPost(post: Post){
    this.show = true
    this.currentPost = post
    this.isEditing = true
  }

  likePost(id:string,likedBy:any){
    this.PostsService.likePost(id,likedBy).subscribe(flag =>{
      this.PostsService.getPosts().subscribe(posts => {
        this.posts = posts
        this.setLikedNhideComment()
      })
    })
  }

}
