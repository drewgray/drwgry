import { Component, OnInit} from '@angular/core';
import {Car} from '../../interfaces/cars.interface';
import { CarService } from '../../services/car.service';

var Instafeed = require("instafeed.js");


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars:any;
  interval: number = 1500;


  constructor(private carService:CarService) {

   }

  ngOnInit(){
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

}
