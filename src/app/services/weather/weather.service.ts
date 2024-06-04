import { Injectable } from '@angular/core';
import { Weather } from '../../interfaces/weather';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CacheService } from '../cache/cache.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    private snackBar: MatSnackBar
  ) {}


  getWeather(city: string): Observable<Weather | null> {
    const cacheKey = 'apiData';
    const cachedData = this.cacheService.getCache(cacheKey);

    if (cachedData && cachedData.name.toLowerCase() === city.toLowerCase()) {
      return of(cachedData);
    } else {
      const options = new HttpParams()
        .set('units', 'metric')
        .set('q', city)
        .set('appId', environment.apiKey);

      return this.http
        .get<Weather>(environment.apiUrl + 'weather', {
          params: options,
        })
        .pipe(
          tap((data) => this.cacheService.setCache(cacheKey, data)),
          catchError((error) => {
            console.error('Failed to fetch data', error);
            this.openSnackBar(`${error.error.message.toUpperCase()} 🚫, TRY AGAIN!`);
            return of(null);
          })
        );
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message);
  }

  clearCache(): void {
    this.cacheService.clearCache('apiData');
  }

  clearAllCache(): void {
    this.cacheService.clearAllCache();
  }
}
