import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // name: String;
  // username: String;
  // email: String;
  // password: String;
  public user: User;

  usernameValid: Boolean = true;
  emailValid: Boolean = true;

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService, 
    private flashMessage:FlashMessagesService,
    private router: Router) { 
    }

  ngOnInit() {
    this.user = {
      name: '',
      username: '',
      email: '',
      password: ''
    }
  }


  onRegisterSubmit(model: User, isValid: boolean){
    const user = {
      name: model.name,
      email: model.email,
      username: model.username,
      password: model.password
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
  if (isValid){
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

 }

 onFocusoutEmail(model: User, isValid: boolean){
  const user = {
      email: model.email
    }

  if(this.validateService.validateEmail(user.email)){
    this.emailValid = true;
  } else{
    this.emailValid = false;
  }

  }

 onFocusoutUsername(model: User, isValid: boolean){
  const user = {
      username: model.username
    }

  this.validateService.validateUsername(user).subscribe(data => {
    //console.log(data);
    if(data.success){
      this.usernameValid = true;
    } else {
      // this.flashMessage.show('User name has already been taken', {cssClass: 'alert-danger', timeout: 3000});
      this.usernameValid = false;
    }
  },    
  err => {
        console.log(err);
        this.usernameValid = false;
      });
  }

}
