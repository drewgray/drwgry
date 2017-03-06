import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {ProjectService} from '../../services/project.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {Project} from '../../interfaces/project.interface';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public project: Project;

  projectNameValid: Boolean = true;

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService, 
    private flashMessage:FlashMessagesService,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit() {

    this.project = {
      name: '',
      details: '',
      url: '',
      logopath: ''
    }
  }

  onAddSubmit(model: Project, isValid: boolean){
    const project = {
      name: model.name,
      details: model.details,
      url: model.url,
      logopath: model.logopath
    }

      if (isValid){
        this.projectService.addProject(project).subscribe(data => {
          if(data.success){
            this.flashMessage.show('Project has been added', {cssClass: 'alert-success', timeout: 3000});
          } else {
            this.flashMessage.show('Oops. Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
          }
          this.router.navigate(['/admin']);
      });
    }
  }

   onFocusoutName(model: Project, isValid: boolean){
  const project = {
      name: model.name
    }

    // if(this.validateService.validateEmail(user.email)){
    //   this.emailValid = true;
    // } else{
    //   this.emailValid = false;
    // }

  }

}

