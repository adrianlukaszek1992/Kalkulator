import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  public doCalculation(firstNumber: string, action: string, secondNumber: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('firstNumber', firstNumber);
    params = params.append('action', action);
    params = params.append('secondNumber', secondNumber);
    return this.http.get(`${this.baseUrl}` + `/calculation`, {params: params});
  }
}
