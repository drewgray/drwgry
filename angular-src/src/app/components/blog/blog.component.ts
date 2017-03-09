import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import {Blog} from '../../interfaces/blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs:Blog[];

  constructor(private blogService:BlogService) { }

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(data => {
     if (data.success){
      this.blogs = data.blogs;
      var dateFormat = require('dateformat');
      for (var blog in this.blogs){
        var obj = this.blogs[blog];
          obj.creationDate = dateFormat(obj.creationDate);
      }
     }
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
