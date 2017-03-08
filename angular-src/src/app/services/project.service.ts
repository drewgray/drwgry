import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {

  projects: any[];
  selectedProject: any;

  constructor(private http:Http) { }

  getAllProjects(){
    let headers = new Headers();
    return this.http.get('projects/all', {headers: headers})
      .map(res => res.json());
  }

    addProject(project){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('projects/add', project, {headers: headers})
      .map(res => res.json());
  }

  deleteProject(proj){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('projects/delete', proj, {headers: headers})
        .map(res => res.json());
  }

}