import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ValidateService {

  constructor(private http:Http) { }

  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
        return false;
    } else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateUsername(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3001/users/exists', user, {headers: headers})
      .map(res => res.json());
  }

  validateEmailexists(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3001/users/getemail', user, {headers: headers})
      .map(res => res.json());
  }



}
