import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {BlogService} from '../../services/blog.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {Blog} from '../../interfaces/blog.interface';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  public blog: Blog;
  user: any;

  blogNameValid: Boolean = true;

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService, 
    private flashMessage:FlashMessagesService,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.blog = {
      name: '',
      bodytext: '',
      tags: new Array<string>(),
      creationDate: Date.now()
    }

    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onAddSubmit(model: Blog, isValid: boolean){
    const blog = {
      name: model.name,
      bodytext: model.bodytext,
      tags: [model.tags],
      creationDate: Date.now(),
      author: this.user.username
    }

      if (isValid){
        this.blogService.addBlog(blog).subscribe(data => {
          if(data.success){
            this.flashMessage.show('Blog has been added', {cssClass: 'alert-success', timeout: 3000});
          } else {
            this.flashMessage.show('Oops. Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
          }
          this.router.navigate(['/admin']);
      });
    }
  }

   onFocusoutName(model: Blog, isValid: boolean){
  const blog = {
      name: model.name
    }

    // if(this.validateService.validateEmail(user.email)){
    //   this.emailValid = true;
    // } else{
    //   this.emailValid = false;
    // }

  }

}

