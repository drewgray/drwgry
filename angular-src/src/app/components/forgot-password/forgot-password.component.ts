import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  username: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onNameSubmit(){
    const user = {
      username: this.username,
      email: ""
    }

    this.validateService.validateUsername(user).subscribe(data => {
    if(!data.success){
          this.validateService.getUseremail(user).subscribe(data => {
            if(data.success){
              user.email = data.email;
              this.validateService.resetAccount(user).subscribe(data => {
                  if(data.success){
                    console.log(data.msg);
                    this.flashMessage.show('Password reset and emailed', {cssClass: 'alert-success', timeout: 3000});
                    this.router.navigate(['/login']);
                  } else {
                    console.log(data.msg);
                  }
                },    
                err => {
                      console.log(err);
              });
            } else {
              console.log(data);
            }
          },    
          err => {
                console.log(err);
        });
    } else {
       this.flashMessage.show('User does not exist', {cssClass: 'alert-danger', timeout: 3000});
    }
  },    
  err => {
        console.log(err);
      });
  }

}
