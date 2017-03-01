import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:Object;

  constructor(
    private authService:AuthService, 
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(allusers => {
      console.log(allusers);
     this.users = allusers.users;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onclickDelete(i){
this.flashMessage.show(this.users[i].username + " has been deleted", {cssClass: 'alert-danger', timeout: 3000});
  }

  onclickPromote(i){
this.flashMessage.show(this.users[i].username + " has been promoted to " + this.users[i].role, {cssClass: 'alert-success', timeout: 3000});
  }

  onclickDemote(i){
this.flashMessage.show(this.users[i].username + " has been demoted to " + this.users[i].role, {cssClass: 'alert-success', timeout: 3000});
  }

}
