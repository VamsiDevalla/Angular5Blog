import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService} from '../../services/posts.service'
import { Post } from '../../models/Post'

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
  post:Post
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.getPost(id).subscribe(post =>{
      this.post = post
    })
  }


}
