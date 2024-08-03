import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {LoaderService} from "./services/loader.service";
// import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'budget';
  token;
  constructor( public loaderService:LoaderService , private router:Router, private authServ:AuthenticationService) {

  }

  isAdmin(){
    return this.authServ.isAdmin();
  }
  isDGB(){
    return this.authServ.isDGB();
  }
  isUser(){
    return this.authServ.isUser();
  }
  isAuthenticated(){
    return this.authServ.isAuthenticated();
  }
  logOut(){
    this.authServ.logout();
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.authServ.loadToken();
  }
}
