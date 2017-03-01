import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  getAllUsers(){
    let headers = new Headers();
    this.loadToken();
    this.loadUser();
    if (this.user && this.user.role == 'admin'){
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/getall', {headers: headers})
      .map(res => res.json());
    } 
    return JSON.parse("false");
  }

  storeUserData(token, user){
    //JWT looks for 'id_token' when validating
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser(){
    const locUser = localStorage.getItem('user');
    this.user = JSON.parse(locUser);
  }

  loggedIn(){
    return tokenNotExpired();
  }

  isAdmin(){
    this.loadUser();
    if (this.user){
    if (this.user.role === 'admin') {
      return true;
    } else{
      return false;
    }
  }
  return false;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  resetAccount(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/resetpw', user, {headers: headers})
      .map(res => res.json());
  }

  updatePW(user){
    let headers = new Headers();
    this.loadUser();
    console.log(this.user);
    user.username = this.user.username;
    console.log(user);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/updatepw', user, {headers: headers})
      .map(res => res.json());
  }

}
