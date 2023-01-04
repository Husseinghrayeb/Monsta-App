import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private _router: Router) { }

  public handleError = (error: HttpErrorResponse) => {
    return this.handleUnauthorized(error);
  }

  private handleUnauthorized = (error: HttpErrorResponse) => {
    if (this._router.url === '/login') {
      return ' Wrong Username or Password';
    }
    else {
      this._router.navigate(['/login']);
      return error.message;
    }
  }
}
