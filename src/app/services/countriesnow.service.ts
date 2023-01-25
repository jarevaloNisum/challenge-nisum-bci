import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesnowService {
  constructor(private http: HttpClient) {}

  loadAllCountries(): Observable<any[]> {
    return this.http
      .get<any[]>('https://countriesnow.space/api/v0.1/countries')
      .pipe(
        map((countries: any) => countries['data']),
        shareReplay()
      );
  }

  loadCityByCountry(country: string): Observable<any[]> {
    return this.http
      .post<any[]>('https://countriesnow.space/api/v0.1/countries/cities', {
        country: country,
      })
      .pipe(
        map((cities: any) => {
          return cities['data'];
        }),
        shareReplay()
      );
  }
}
