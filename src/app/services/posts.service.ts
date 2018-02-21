import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from "../models/Post"
import { Comment } from '../models/Comment'
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../services/auth.service'

@Injectable()
export class PostsService {
  HttpOptions = {
    headers: new HttpHeaders({'authorization': this.auth.fetchToken(),'Content-Type':'Application/json'})
  }
  postsUrl = "http://localhost:2000/posts"

  constructor(private http : HttpClient,private auth:AuthService) {
     
   }
 getPosts():Observable<Post[]>{
   return this.http.get<Post[]>(this.postsUrl,this.HttpOptions)
 }

 getPost(id:string):Observable<Post>{
  return this.http.get<Post>(`${this.postsUrl}/${id}`,this.HttpOptions)
}


 sendPost(post: Post):Observable<Post>{
   return this.http.post<Post>(this.postsUrl,post,this.HttpOptions)
 }

 updatePost(post: Post):Observable<Post>{
   const url = `${this.postsUrl}/${post._id}`
   return this.http.put<Post>(url,post,this.HttpOptions)
 }

 removePost(post: Post ):Observable<{flag:string}>{
  const url = `${this.postsUrl}/${post._id}`
  return this.http.delete<{flag:string}>(url,this.HttpOptions)
 }

 likePost(id:string,likedBy:any):Observable<{flag:string}>{
  const url = `${this.postsUrl}/like/${id}`
  return this.http.put<{flag: string}>(url,likedBy,this.HttpOptions)
}

sendComment(id:string,comment:Comment):Observable<Post>{
  const url = `${this.postsUrl}/comment/${id}`
  return this.http.put<Post>(url,comment,this.HttpOptions)
}

}

