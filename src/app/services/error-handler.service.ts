import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private _router: Router) { }

  public handleError = (error: HttpErrorResponse) => {
    return error.error.errorMessage;
  }
}
