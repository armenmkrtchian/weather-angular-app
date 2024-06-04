import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Weather } from '../interfaces/weather';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  weather: Weather | undefined;

  constructor(private weatherService: WeatherService, private router: Router) {}

  search(city: string): void {
    this.weatherService.getWeather(city).subscribe((weather) => {
      if (weather) {
        this.gotoWeatherDashboard(weather);
      }
    });
  }

  gotoWeatherDashboard(weather: Weather): void {
    this.router.navigateByUrl('/weather-dashboard', { state: weather });
  }
}
