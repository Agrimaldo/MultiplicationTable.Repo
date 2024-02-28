import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { CalculateResponse } from '../../types/CalculateResponse';


const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class MultiplicationService {

  private http = inject(HttpClient);
  constructor() { }

  public calculate(numberList: number[]): Observable<CalculateResponse[]> {
    return this.http
      .post<CalculateResponse[]>(`${BASE_URL}/Calculate`, numberList)
      .pipe(shareReplay(1));
  }
}
