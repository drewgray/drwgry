import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {ProjectService} from '../../services/project.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {Project} from '../../interfaces/project.interface';
import {UploadService} from '../../services/upload.service';
import { Http } from '@angular/http';

const URL = '';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public project: Project;

  projectNameValid: Boolean = true;

  projImage: any;

 @ViewChild('inputFile') inputFile:ElementRef;

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService, 
    private flashMessage:FlashMessagesService,
    private router: Router,
    private projectService: ProjectService,
    private uploadService: UploadService,
    private e1: ElementRef
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
      logopath: ''
    }

      if (isValid){
              // Get form input
            let inputFile: HTMLInputElement = this.inputFile.nativeElement;

            let fileCount: number = inputFile.files.length;

            let formData = new FormData();

            if( fileCount > 0 ){
              for(let i = 0; i < fileCount; i++){
                formData.append('uploads[]', inputFile.files.item(i), inputFile.files.item(i).name);
              }

              this.uploadService.uploadFiles(formData).subscribe(data => {
                project.logopath = data.urls;
                this.projectService.addProject(project).subscribe(data => {
                if(data.success){
                  this.flashMessage.show('Project has been added', {cssClass: 'alert-success', timeout: 3000});
                } else {
                  this.flashMessage.show('Oops. Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
                }
                this.router.navigate(['/admin']);
                });
              });
            } else{
              this.flashMessage.show('Oops. Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
            }
    }
  }

   onFocusoutName(model: Project, isValid: boolean){
      const project = {
          name: model.name
        }

  }

    sendToServer(){

    }

}

