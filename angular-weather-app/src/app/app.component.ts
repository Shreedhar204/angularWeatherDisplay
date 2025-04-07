import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeolocationService } from './services/geolocation.service';
import { WeatherService } from './services/weather.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-weather-app';
  temperature: number = 0;
  units: string = '';
  latitude: number = 0;
  longitude: number = 0;

  constructor(
    private geoService: GeolocationService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.geoService.getCurrentPosition().subscribe({
      next: (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        if (this.latitude && this.longitude) {
          this.weatherService
            .getWeather(this.latitude, this.longitude)
            .subscribe({
              next: (weather) => {
                this.temperature = weather.current.temperature_2m;
                this.units = weather.current_units.temperature_2m;
                console.log(weather);
              },
              error: (err) => {
                console.error('Could not get weather:', err);
              },
            });
        } else {
          console.error('Could not get weather');
        }
        // console.log('AppComponent got location:', latitude, longitude);
      },
      error: (err) => {
        console.error('Could not get location:', err);
      },
    });
  }
}
