import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects:any;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(data => {
      if (data.success){
      this.projects = data.projects;
      console.log(this.projects);
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
