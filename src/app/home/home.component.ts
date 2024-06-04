import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Weather } from '../interfaces/weather';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  weather: Weather | undefined;
  searchInput = new FormControl();

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((city) => this.weatherService.getWeather(city)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((weather) => {
        if (weather) {
          this.gotoWeatherDashboard(weather);
        }
      });
  }

  gotoWeatherDashboard(weather: Weather): void {
    this.router.navigateByUrl('/weather-dashboard', { state: weather });
  }
}
