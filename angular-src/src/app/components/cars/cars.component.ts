import { Component, OnInit} from '@angular/core';
import {Car} from '../../interfaces/cars.interface'

var Instafeed = require("instafeed.js");


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  feed:any;

  firstimg:Boolean;
  lastimg:Boolean;

  currentImg:String;

  gtrImages:Car[];
  nGTR:number;
  talonImages:Car[];
  nTalon:number;
  gromImages:Car[];
  nGrom:number;
  evoqueImages:Car[];
  nEvoque:number;
  oldImages:Car[];
  nOld:number;
  interval: number = 1000;
  

  constructor() {
 this.firstimg = true;
      this.lastimg = false;
      this.currentImg = '';
      
      this.gtrImages = [{"title": "1", "url": 'assets/img/cars/gtr/1.jpg'},
                        {"title": "2", "url": 'assets/img/cars/gtr/2.jpg'},
                        {"title": "3", "url": 'assets/img/cars/gtr/3.jpg'},
                        {"title": "4", "url": 'assets/img/cars/gtr/4.jpg'},
                        {"title": "5", "url": 'assets/img/cars/gtr/5.jpg'},
                        {"title": "6", "url": 'assets/img/cars/gtr/6.jpg'}
                        ];

    this.talonImages = [{"title": "1", "url": 'assets/img/cars/talon/1.jpg'},
                        {"title": "2", "url": 'assets/img/cars/talon/2.jpg'}
                        ];
    this.nGTR = this.gtrImages.length*100;
    this.nTalon = this.talonImages.length*100;
      
   }

  ngOnInit(){
     

  }

}
