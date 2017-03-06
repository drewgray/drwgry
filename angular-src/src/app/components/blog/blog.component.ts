import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs:any;

  constructor(private blogService:BlogService) { }

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(data => {
     if (data.success){
     this.blogs = data.blogs;
     }
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
