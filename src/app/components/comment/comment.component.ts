import { Component, OnInit,ViewChild,EventEmitter,Output,Input } from '@angular/core';
import { PostsService} from '../../services/posts.service'
import { Post } from '../../models/Post'
import {AuthService} from '../../services/auth.service'
import { Comment } from '../../models/Comment'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @ViewChild('commentForm') form : any
  @Input() post: Post
  @Output() newComment: EventEmitter<Post> = new EventEmitter()
  comment: Comment
  constructor(private PostsService: PostsService, private auth:AuthService) { }

  ngOnInit() {
    this.comment ={
      text:"",
      author: this.auth.fetchUser()._id,  
    }
  }

  onSubmit({value, valid}: {value: Comment, valid: boolean}) {
    if(!valid){
      console.log('Form is not valid');
    } else {
      this.PostsService.sendComment(this.post._id,value).subscribe(post =>{
        this.newComment.emit(post)
      });
      this.form.reset();
    }
  }

}
