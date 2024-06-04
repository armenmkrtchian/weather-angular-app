import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherDashboardComponent } from './weather-dashboard/weather-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'weather-dashboard', component: WeatherDashboardComponent },
  { path: '**', component: PageNotFoundComponent },
];
