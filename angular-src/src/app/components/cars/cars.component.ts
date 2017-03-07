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

  gtrImages:Object[];
  nGTR:number;
  talonImages:Object[];
  nTalon:number;
  gromImages:Object[];
  nGrom:number;
  evoqueImages:Object[];
  nEvoque:number;
  oldImages:Object[];
  nOld:number;
  interval: number = 1500;


  constructor() {
 this.firstimg = true;
      this.lastimg = false;
      this.currentImg = '';
      
      this.gtrImages = [{"title": "1", "url": 'http://assets.drwgry.com/img/cars/gtr/1.jpg'},
                        {"title": "2", "url": 'http://assets.drwgry.com/img/cars/gtr/2.jpg'},
                        {"title": "3", "url": 'http://assets.drwgry.com/img/cars/gtr/3.jpg'},
                        {"title": "4", "url": 'http://assets.drwgry.com/img/cars/gtr/4.jpg'},
                        {"title": "5", "url": 'http://assets.drwgry.com/img/cars/gtr/5.jpg'},
                        {"title": "6", "url": 'http://assets.drwgry.com/img/cars/gtr/6.jpg'},
                        {"title": "7", "url": 'http://assets.drwgry.com/img/cars/gtr/7.jpg'},
                        {"title": "8", "url": 'http://assets.drwgry.com/img/cars/gtr/8.jpg'}
                        ];

    this.talonImages = [{"title": "1", "url": 'http://assets.drwgry.com/img/cars/talon/1.jpg'},
                        {"title": "2", "url": 'http://assets.drwgry.com/img/cars/talon/2.jpg'},
                        {"title": "3", "url": 'http://assets.drwgry.com/img/cars/talon/3.jpg'},
                        {"title": "4", "url": 'http://assets.drwgry.com/img/cars/talon/4.jpg'}
                        ];

    this.gromImages = [{"title": "1", "url": 'http://assets.drwgry.com/img/cars/grom/1.jpg'}];

    this.evoqueImages = [{"title": "1", "url": 'http://assets.drwgry.com/img/cars/evoque/1.jpg'}];

    this.nGTR = this.gtrImages.length*100;
    this.nTalon = this.talonImages.length*100;
    this.nGrom = this.gromImages.length*100;
    this.nEvoque = this.evoqueImages.length*100;
    // this.nOld = this.oldImages.length*100;
      
   }

  ngOnInit(){
     

  }

}
