import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeolocationService } from './services/geolocation.service';
import { WeatherService } from './services/weather.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCardModule, MatButtonToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-weather-app';
  temperature: number = 0;
  units: string = '';
  latitude: number = 0;
  longitude: number = 0;
  unitSelected: string = 'c';

  constructor(
    private geoService: GeolocationService,
    private weatherService: WeatherService
  ) {}
  hideSingleSelectionIndicator = signal(false);

  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update((value) => !value);
  }
  ngOnInit(): void {
    this.geoService.getCurrentPosition().subscribe({
      next: (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.fetchWeather();
      },
      error: (err) => {
        alert('Error: Failed to get location information: ' + err.message);
      },
    });
  }

  fetchWeather() {
    if (this.latitude && this.longitude) {
      this.weatherService
        .getWeather(this.latitude, this.longitude, this.unitSelected)
        .subscribe({
          next: (weather) => {
            this.temperature = weather.current.temperature_2m;
            this.units = weather.current_units.temperature_2m;
          },
          error: () => {
            alert('Error: Failed to get weather information.');
          },
        });
    }
  }

  onUnitToggle(unit: string) {
    this.unitSelected = unit;
    this.fetchWeather();
  }
}
