import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly apiUrl = 'http://localhost:5000/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }

  updateCustomer(customerId: string, customer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${customerId}`, customer);
  }

  deleteCustomer(customerId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${customerId}`);
  }
}
