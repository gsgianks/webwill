import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderList } from '../models/order-list';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http: HttpClient) { }

  getOrderById(orderId: number): Observable<OrderList>{
    return this.http.get<OrderList>(`${environment.urlService}/Order/GetOrderById/${orderId}`);
  }
}
