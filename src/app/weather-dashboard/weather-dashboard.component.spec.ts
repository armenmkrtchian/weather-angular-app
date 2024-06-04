import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDashboardComponent } from './weather-dashboard.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Weather } from '../interfaces/weather';

describe('WeatherDashboardComponent', () => {
  let component: WeatherDashboardComponent;
  let fixture: ComponentFixture<WeatherDashboardComponent>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockLocation = jasmine.createSpyObj('Location', ['getState']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [WeatherDashboardComponent],
      imports: [MatCardModule, MatButtonModule],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize weather data from Location state', () => {
    const mockWeather: Weather = {
      name: 'London', main: {
        temp: 20,
        pressure: 0,
        humidity: 0
      },
      weather: [],
      id: '',
      wind: {
        speed: 0
      },
      sys: {
        country: ''
      }
    };
    mockLocation.getState.and.returnValue(mockWeather);

    component.ngOnInit();

    expect(component.weather).toEqual(mockWeather);
  });

  it('should navigate to home page on button click', () => {
    component.goToHome();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
  });
});
