import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:any;
  cars:any;

  constructor(
    private authService:AuthService, 
    private router:Router,
    private flashMessage:FlashMessagesService,
    overlay: Overlay, 
    vcRef: ViewContainerRef, 
    public modal: Modal,
    private carService:CarService) 
    {
      overlay.defaultViewContainer = vcRef;
     }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(allusers => {
     this.users = allusers.users;
    },
    err => {
      console.log(err);
      return false;
    });

    this.carService.getAllCars().subscribe(allcars => {
     if (allcars.success){
     this.cars = allcars.cars;
     }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onclickDelete(i){
    var uname = this.users[i].username;

    this.modal.confirm()
            .size('sm')
            .title('Confirm Removal')
            .body(`Are you sure you want to delete ` + uname + `?`)
            .okBtn('DELETE')
            .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
            .then((result: any) => { this.confirmDelete(uname, i) })
            .catch((err: any) =>  console.log('delete cancelled'));
  }

  onclickDeleteCar(i){

  }

  confirmDelete(uname, i){
    this.authService.deleteUser(this.users[i]).subscribe(res => {
      if (res.success){
        this.users.splice(i,1);
        this.flashMessage.show(uname + " has been deleted", {cssClass: 'alert-danger', timeout: 3000});
      }
      },
      err => {
        console.log(err);
        return false;
      });
  }

  onclickPromote(i){
    this.authService.promoteUser(this.users[i]).subscribe(res => {
    if (res.success){
      this.users[i] = res.user;
      this.flashMessage.show(this.users[i].username + " has been promoted to " + this.users[i].role, {cssClass: 'alert-success', timeout: 3000});
    }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onclickDemote(i){
      this.authService.demoteUser(this.users[i]).subscribe(res => {
        if (res.success){
        this.users[i] = res.user;
        this.flashMessage.show(this.users[i].username + " has been demoted to " + this.users[i].role, {cssClass: 'alert-success', timeout: 3000});
      }},
      err => {
        console.log(err);
        return false;
      });
  }

}
