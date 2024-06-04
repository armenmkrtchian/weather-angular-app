import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { CacheService } from '../cache/cache.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Weather } from '../../interfaces/weather';
import { environment } from '../../../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  let cacheService: jasmine.SpyObj<CacheService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const cacheSpy = jasmine.createSpyObj('CacheService', [
      'getCache',
      'setCache',
      'clearCache',
      'clearAllCache',
    ]);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        WeatherService,
        { provide: CacheService, useValue: cacheSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
    cacheService = TestBed.inject(CacheService) as jasmine.SpyObj<CacheService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cached data if available and city matches', () => {
    const city = 'London';
    const mockWeather: Weather = {
      name: 'London',
      main: { temp: 15 },
    } as Weather;
    cacheService.getCache.and.returnValue(mockWeather);

    service.getWeather(city).subscribe((data) => {
      expect(data).toEqual(mockWeather);
    });

    expect(cacheService.getCache).toHaveBeenCalledWith('apiData');
  });

  it('should fetch data from API if no cached data is available', () => {
    const city = 'Paris';
    const mockWeather: Weather = {
      name: 'Paris',
      main: { temp: 20 },
    } as Weather;
    cacheService.getCache.and.returnValue(null);

    service.getWeather(city).subscribe((data) => {
      expect(data).toEqual(mockWeather);
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url.includes('weather') &&
        request.params.has('q') &&
        request.params.get('q') === city
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockWeather);

    expect(cacheService.setCache).toHaveBeenCalledWith('apiData', mockWeather);
  });

  it('should handle error and open snack bar on API failure', () => {
    const city = 'UnknownCity';
    cacheService.getCache.and.returnValue(null);

    service.getWeather(city).subscribe((data) => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url.includes('weather') &&
        request.params.has('q') &&
        request.params.get('q') === city
    );
    req.flush(
      { message: 'City not found' },
      { status: 404, statusText: 'Not Found' }
    );

    expect(snackBar.open).toHaveBeenCalledWith('CITY NOT FOUND');
  });

  it('should clear specific cache by key', () => {
    service.clearCache();
    expect(cacheService.clearCache).toHaveBeenCalledWith('apiData');
  });

  it('should clear all cache', () => {
    service.clearAllCache();
    expect(cacheService.clearAllCache).toHaveBeenCalled();
  });
});
