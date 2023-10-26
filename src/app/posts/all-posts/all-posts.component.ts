import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { NewPostsComponent } from '../new-posts/new-posts.component';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {
  postData: Array<object>;

  constructor(private postSrvc: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postSrvc.loadPost().subscribe((data) => {
      this.postData = data;
    });
  }

  onDelete(id:string, postImgPath) {
    this.postSrvc.postDelete(id, postImgPath);
  }

  feature(id:string) {
    this.postSrvc.setAsFeatured(id);
  }

  unfeature(id:string) {
    this.postSrvc.removeFeatured(id);
  }
}
