import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CarService } from '../../services/car.service';
import { BlogService } from '../../services/blog.service';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:any;
  cars:any;
  blogs:any;
  projects:any;

  constructor(
    private authService:AuthService, 
    private router:Router,
    private flashMessage:FlashMessagesService,
    overlay: Overlay, 
    vcRef: ViewContainerRef, 
    public modal: Modal,
    private carService:CarService,
    private blogService:BlogService,
    private projectService:ProjectService,
    private uploadService: UploadService) 
    {
      overlay.defaultViewContainer = vcRef;
     }

  ngOnInit() {
    this.getAllUsers();

    this.getAllCars();

    this.getAllBlogs();

    this.getAllProjects();
  }

  getAllUsers(){
    this.authService.getAllUsers().subscribe(data => {
     this.users = data.users;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getAllCars(){
   this.carService.getAllCars().subscribe(data => {
     if (data.success){
     this.cars = data.cars;
     }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getAllBlogs(){
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

  getAllProjects(){
       this.projectService.getAllProjects().subscribe(data => {
     if (data.success){
     this.projects = data.projects;
     }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onclickDeleteUser(i){
    var uname = this.users[i].username;

    this.modal.confirm()
            .size('sm')
            .title('Confirm Removal')
            .body(`Are you sure you want to delete ` + uname + `?`)
            .okBtn('DELETE')
            .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
            .then((result: any) => { this.confirmDeleteUser(uname, i) })
            .catch((err: any) =>  console.log('delete cancelled'));
  }

  onclickDeleteCar(i){
        var cname = this.blogs[i].name;

        this.modal.confirm()
            .size('sm')
            .title('Confirm Removal')
            .body(`Are you sure you want to delete ` + cname + `?`)
            .okBtn('DELETE')
            .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
            .then((result: any) => { this.confirmDeleteCar(cname, i) })
            .catch((err: any) =>  console.log('delete cancelled'));

  }

  onclickDeleteBlog(i){
    var bname = this.blogs[i].name;

        this.modal.confirm()
            .size('sm')
            .title('Confirm Removal')
            .body(`Are you sure you want to delete ` + bname + `?`)
            .okBtn('DELETE')
            .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
            .then((result: any) => { this.confirmDeleteBlog(bname, i) })
            .catch((err: any) =>  console.log('delete cancelled'));
  }

    onclickDeleteProject(i){
    var pname = this.projects[i].name;

        this.modal.confirm()
            .size('sm')
            .title('Confirm Removal')
            .body(`Are you sure you want to delete ` + pname + `?`)
            .okBtn('DELETE')
            .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
            .then((result: any) => { this.confirmDeleteProject(pname, i) })
            .catch((err: any) =>  console.log('delete cancelled'));
  }

  confirmDeleteUser(uname, i){
    this.authService.deleteUser(this.users[i]).subscribe(res => {
      if (res.success){
        this.users.splice(i,1);
        this.flashMessage.show(uname + " has been deleted", {cssClass: 'alert-danger', timeout: 3000});
        this.getAllUsers();
      }
      },
      err => {
        console.log(err);
        return false;
      });
  }

    confirmDeleteBlog(bname, i){
    this.blogService.deleteBlog(this.blogs[i]).subscribe(res => {
      if (res.success){
        this.users.splice(i,1);
        this.flashMessage.show(bname + " has been deleted", {cssClass: 'alert-danger', timeout: 3000});
        this.getAllBlogs();
      }
      },
      err => {
        console.log(err);
        return false;
      });
  }

  confirmDeleteCar(cname, i){
    this.carService.deleteCar(this.cars[i]).subscribe(res => {
      if (res.success){
        this.users.splice(i,1);
        this.flashMessage.show(cname + " has been deleted", {cssClass: 'alert-danger', timeout: 3000});
        this.getAllCars();
      }
      },
      err => {
        console.log(err);
        return false;
      });
  }

  confirmDeleteProject(bname, i){
    this.projectService.deleteProject(this.projects[i]).subscribe(res => {
      if (res.success){
        this.users.splice(i,1);
        this.flashMessage.show(bname + " has been deleted", {cssClass: 'alert-danger', timeout: 3000});
        this.getAllProjects();
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

  onclickEditCar(i){

  }

  onclickEditBlog(i){

  }

  onclickEditProject(i){

  }

}
