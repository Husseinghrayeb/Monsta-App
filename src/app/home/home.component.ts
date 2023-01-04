import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AppMonstaService } from '../services/app-monsta.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private appService: AppMonstaService) { }

  ngOnInit(): void {
    this.appService.style().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err: HttpErrorResponse) => {
        console.log("error: " , err)
      }
    })
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
