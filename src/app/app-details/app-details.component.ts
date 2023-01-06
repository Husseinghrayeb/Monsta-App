import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppMonstaService } from '../services/app-monsta.service';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent implements OnInit {
  logoUrl: any;
  appName: any;
  appRank: any;
  appPublisher: any;
  appGenre: any;
  appDescription: any;
  appScreenShotsUrls: any;

  constructor(private appServices: AppMonstaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.appServices.getApp(params.store, params.appId, params.country).subscribe(data => {
        let object = JSON.parse(data);
        this.logoUrl = object.icon_url;
        this.appName = object.app_name;
        this.appRank = object.all_rating;
        this.appPublisher = object.publisher_name;
        this.appGenre = object.genre;
        this.appDescription = object.description;
        this.appScreenShotsUrls = object.screenshot_urls
      })
    })

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

}
