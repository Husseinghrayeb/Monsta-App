import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AppMonstaService } from '../services/app-monsta.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countries: any = ['AO', 'AI', 'AL', 'AE', 'AR', 'AM', 'AG', 'AU', 'AT', 'AZ', 'BE', 'BJ', 'BF', 'BG', 'BH', 'BS',
    'BY', 'BZ', 'BM', 'BO', 'BR', 'BB', 'BN', 'BT', 'BW', 'CA', 'CH', 'CL', 'CN', 'CG', 'CO', 'CV', 'CR', 'KY', 'CY',
    'CZ', 'DE', 'DM', 'DK', 'DO', 'DZ', 'EC', 'EG', 'ES', 'EE', 'FI', 'FJ', 'FR', 'FM', 'GB', 'GH', 'GM', 'GW', 'GR',
    'GD', 'GT', 'GY', 'HK', 'HN', 'HR', 'HU', 'ID', 'IN', 'IE', 'IS', 'IL', 'IT', 'JM', 'JO', 'JP', 'KZ', 'KE', 'KG',
    'KH', 'KN', 'KR', 'KW', 'LA', 'LB', 'LR', 'LC', 'LK', 'LT', 'LU', 'LV', 'MO', 'MD', 'MG', 'MX', 'MK', 'ML', 'MT',
    'MN', 'MZ', 'MR', 'MS', 'MU', 'MW', 'MY', 'NA', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NZ', 'OM', 'PK', 'PA', 'PE',
    'PH', 'PW', 'PG', 'PL', 'PT', 'PY', 'QA', 'RO', 'RU', 'SA', 'SN', 'SG', 'SB', 'SL', 'SV', 'ST', 'SR', 'SK', 'SI', 'SE', 'SZ', 'SC', 'TC', 'TD', 'TH', 'TJ',
    'TM', 'TT', 'TN', 'TR', 'TW', 'TZ', 'UG', 'UA', 'UY', 'US', 'UZ', 'VC', 'VE', 'VG', 'VN', 'YE', 'ZA', 'ZW']

  selectedCountry: any;

  serializedDate: any;
  apps: any = [];
  genreRanks: any = [];
  androidGenreRanks: any = [];
  store: any;

  constructor(private authService: AuthService, private router: Router, private appService: AppMonstaService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.appService.getAndroidGenreRankings().subscribe({
      next: (res) => {
        res.split("\n").map(item => {
          this.genreRanks.push(JSON.parse(item))
        })
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(JSON.parse(error.error).message);
      }
    })

    this.appService.getItunesGenreRankings().subscribe({
      next: (res) => {
        if (this.androidGenreRanks.length == 0) {
          res.split("\n").map(item => {
            this.genreRanks.push(JSON.parse(item))
          })
        } else {
          res.split("\n").map(item => this.genreRanks.push(JSON.parse(item))
          )
        }
        console.log(this.genreRanks)
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(JSON.parse(error.error).message);
      }
    })

  }

  public changeCountry = (event: { value: any; }) => {
    this.selectedCountry = event.value
  }

  public getSpecificAndroidAppsByCountryAndDate() {
    this.store = "android"
    if (!this.serializedDate || !this.selectedCountry) {
      let snackBarRef = this.matSnackBar.open('Please Select Country and date');
    }
    else {
      console.log(this.serializedDate)
      this.appService.getStoreAppsRank("android", new Date(this.serializedDate).toISOString().slice(0, 10), this.selectedCountry).subscribe({
        next: (res) => {
          res.split("\n").map(item => this.apps.push(JSON.parse(item)))
        },
        error: (error: HttpErrorResponse) => {
          this.matSnackBar.open(JSON.parse(error.error).message);
        }
      })
    }
  }

  getColor(num: any, rate: any) {
    enum COLORS {
      GRAY = "#E0E0E0",
      YELLOW = "#FFCA28"
    }
    if (this.isAboveRating(num, rate)) {
      return COLORS.GRAY
    }
    else {
      return COLORS.YELLOW
    }
  }

  isAboveRating(num: any, rate: any) {
    return num > rate;
  }

  gotoDetails(item: any) {
    this.router.navigate(['/app'], { queryParams: { country: this.selectedCountry, appId: item.app_id, store: this.store } })
  }

  public getSpecificIOSAppsByCountryAndDate() {
    this.store = "itunes"
    if (!this.serializedDate || !this.selectedCountry) {
      let snackBarRef = this.matSnackBar.open('Please Select Country and date');
    }
    else {
      this.appService.getStoreAppsRank("itunes", new Date(this.serializedDate).toISOString().slice(0, 10), this.selectedCountry).subscribe({
        next: (res) => {
          res.split("\n").map(item => this.apps.push(JSON.parse(item)))
        },
        error: (error: HttpErrorResponse) => {
          this.matSnackBar.open(JSON.parse(error.error).message);
        }
      })
    }
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
