import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

  Blogs: any[];
  selectedBlog: any;

  constructor(private http:Http) { }

  getAllBlogs(){
    let headers = new Headers();
    return this.http.get('http://localhost:3000/blogs/all', {headers: headers})
      .map(res => res.json());
  }

    addBlog(blog){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/blogs/add', blog, {headers: headers})
      .map(res => res.json());
  }

  deleteBlog(blog){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/blogs/delete', blog, {headers: headers})
        .map(res => res.json());
  }

}