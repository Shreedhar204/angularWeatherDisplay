import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(
    latitude: number,
    longitude: number,
    unit: string
  ): Observable<any> {
    const tempUnit = unit === 'c' ? 'celsius' : 'fahrenheit';
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=${tempUnit}`;
    return this.http.get(url);
  }
}
