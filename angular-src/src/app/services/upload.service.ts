import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {

  uploads: any[];
  upload: any;

  constructor(private http:Http) { }

  uploadFiles(formData){
    return this.http.post('upload/', formData)
    .map(res => res.json());
  }

}
