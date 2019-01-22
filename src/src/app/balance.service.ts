import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BalanceModel } from './interfaces/balance-model';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  // constructor(private http: HttpClientModule) { }

  getData(): BalanceModel {
    return {
      currency: 'US',
      mainBalance: 200,
      gameBalance: 0
    }
  }
}
