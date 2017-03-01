import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-pw',
  templateUrl: './update-pw.component.html',
  styleUrls: ['./update-pw.component.css']
})
export class UpdatePWComponent implements OnInit {

  currentPW: String;
  newPW: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onPWSubmit(){
    const user = {
      currentPW: this.currentPW,
      newPW: this.newPW
    }
    this.authService.updatePW(user).subscribe(data => {
      if(data.success){
        console.log(data.msg);
        this.flashMessage.show('Password updated', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        console.log(data);
        this.flashMessage.show('Incorrect Password', {cssClass: 'alert-danger', timeout: 3000});
      }
    },    
    err => {
      console.log(err);
      this.flashMessage.show('Incorrect Password', {cssClass: 'alert-danger', timeout: 3000});
    });
  }

}
