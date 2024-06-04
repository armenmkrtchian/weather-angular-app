import { Component } from '@angular/core';
import { Weather } from '../interfaces/weather';
import { MatCardModule } from '@angular/material/card';
import { DecimalPipe, Location, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [MatCardModule, DecimalPipe, NgIf, MatButtonModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss',
})
export class WeatherDashboardComponent {
  weather: Weather | undefined;

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.weather = this.location.getState() as Weather;
    console.log(this.weather);
  }

  goToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
