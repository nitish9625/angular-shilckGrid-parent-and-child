import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SilkFrezoService {

  constructor(private http: HttpClient) { }

  getdata(){
    return this.http.get<any>('https://localhost:7290/api/employees');
  }
}
