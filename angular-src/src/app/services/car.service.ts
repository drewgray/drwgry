import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarService {

  cars: any[];
  car: any;

  constructor(private http:Http) { }

  getAllCars(){
    let headers = new Headers();
    return this.http.get('cars/all', {headers: headers})
      .map(res => res.json());
  }

    addCar(car){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('cars/add', car, {headers: headers})
      .map(res => res.json());
  }

  deleteCar(car){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('cars/delete', car, {headers: headers})
        .map(res => res.json());
  }

}
