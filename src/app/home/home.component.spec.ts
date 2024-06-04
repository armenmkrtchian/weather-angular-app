import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { WeatherService } from '../services/weather/weather.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Weather } from '../interfaces/weather';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;
  let router: Router;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeather']);

    await TestBed.configureTestingModule({
      imports: [MatInputModule, RouterTestingModule.withRoutes([])],
      declarations: [HomeComponent],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWeather and navigate on successful search', () => {
    const mockWeather: Weather = { name: 'Paris', main: { temp: 20 } } as Weather;
    weatherService.getWeather.and.returnValue(of(mockWeather));
    spyOn(component, 'gotoWeatherDashboard');

    component.search('Paris');

    expect(weatherService.getWeather).toHaveBeenCalledWith('Paris');
    expect(component.gotoWeatherDashboard).toHaveBeenCalledWith(mockWeather);
  });

  it('should not navigate if no weather data is returned', () => {
    weatherService.getWeather.and.returnValue(of(null));
    spyOn(component, 'gotoWeatherDashboard');

    component.search('UnknownCity');

    expect(weatherService.getWeather).toHaveBeenCalledWith('UnknownCity');
    expect(component.gotoWeatherDashboard).not.toHaveBeenCalled();
  });

  it('should navigate to weather dashboard with weather data', () => {
    const mockWeather: Weather = { name: 'Paris', main: { temp: 20 } } as Weather;
    spyOn(router, 'navigateByUrl');

    component.gotoWeatherDashboard(mockWeather);

    expect(router.navigateByUrl).toHaveBeenCalledWith('/weather-dashboard', { state: mockWeather });
  });
});
