import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router'

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UpdatePWComponent } from './components/update-pw/update-pw.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ResumeComponent } from './components/resume/resume.component';
import { CarsComponent } from './components/cars/cars.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogComponent } from './components/blog/blog.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { CarService } from './services/car.service';
import { BlogService } from './services/blog.service';
import { ProjectService } from './services/project.service';

import {FlashMessagesModule} from 'angular2-flash-messages';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ModalModule } from 'angular2-modal';
import {BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CarouselModule } from 'ng2-bootstrap';
import { FileUploader } from 'ng2-file-upload';

import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'forgotpw', component: ForgotPasswordComponent},
  {path: 'updatepw', component: UpdatePWComponent, canActivate:[AuthGuard]}, 
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard, AdminGuard]},  
  {path: 'projects', component: ProjectsComponent},
  {path: 'resume', component: ResumeComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'addcar', component: AddCarComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'addproject', component: AddProjectComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'addblogpost', component: AddBlogComponent, canActivate:[AuthGuard, AdminGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    UpdatePWComponent,
    AdminComponent,
    ProjectsComponent,
    ResumeComponent,
    CarsComponent,
    FooterComponent,
    BlogComponent,
    AddCarComponent,
    AddProjectComponent,
    AddBlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    Ng2GoogleChartsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    CarouselModule.forRoot()
  ],
  providers: [
    ValidateService, 
    AuthService, 
    CarService,
    BlogService,
    ProjectService,
    AuthGuard, 
    AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
