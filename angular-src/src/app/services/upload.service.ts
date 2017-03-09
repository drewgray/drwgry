import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {

  constructor(private http:Http) { }

  uploadFiles(formData){
    console.log(formData);
    return this.http.post('uploads/img', formData)
    .map(res => res.json());
  }

}
