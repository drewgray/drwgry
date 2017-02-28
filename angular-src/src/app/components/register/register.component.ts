import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  usernameValid: Boolean = false;

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService, 
    private flashMessage:FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

  // Validate email
  if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
  }

  // Validate open username
  if(!this.validateService.validateUsername(user.username)){
      this.flashMessage.show('User name has already been taken', {cssClass: 'alert-danger', timeout: 3000});
      return false;
  }

  // Register user
  this.authService.registerUser(user).subscribe(data => {
    if(data.success){
      this.flashMessage.show('You are now registered and may log in', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/login']);
    } else {
      this.flashMessage.show('Oops. Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
    }
  });

 }

 onFocusoutUsername(){
  const user = {
      username: this.username
    }

  this.validateService.validateUsername(user).subscribe(data => {
    //console.log(data);
    if(data.success){
      this.usernameValid = true;
    } else {
      this.flashMessage.show('User name has already been taken', {cssClass: 'alert-danger', timeout: 3000});
      this.usernameValid = false;
    }
  },    
  err => {
        console.log(err);
        this.usernameValid = false;
      });
  }

}
