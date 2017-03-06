import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {CarService} from '../../services/car.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {Car} from '../../interfaces/cars.interface';
import {Project} from '../../interfaces/project.interface';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public car: Car;

  carNameValid: Boolean = true;

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService, 
    private flashMessage:FlashMessagesService,
    private router: Router,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.car = {
      name: '',
      make: '',
      model: '',
      year: 1900,
      currentCar: false,
      creationDate: Date.now()
    }
  }

  onAddSubmit(model: Car, isValid: boolean){
    const car = {
      name: model.name,
      year: model.year,
      make: model.make,
      model: model.model,
      currentCar: model.currentCar,
      creationDate: Date.now()
    }

      if (isValid){
        this.carService.addCar(car).subscribe(data => {
          if(data.success){
            this.flashMessage.show('Car has been added', {cssClass: 'alert-success', timeout: 3000});
          } else {
            this.flashMessage.show('Oops. Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
          }
          this.router.navigate(['/admin']);
      });
    }
  }

   onFocusoutName(model: Car, isValid: boolean){
  const car = {
      name: model.name
    }

    // if(this.validateService.validateEmail(user.email)){
    //   this.emailValid = true;
    // } else{
    //   this.emailValid = false;
    // }

  }

}

