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

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ModalModule } from 'angular2-modal';
import {BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

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
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard, AdminGuard]}  
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
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    Ng2GoogleChartsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
