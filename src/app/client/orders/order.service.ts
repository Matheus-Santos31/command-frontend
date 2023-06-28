import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRequestResult } from '@shared/models/base-request-result';
import { environment } from 'src/environments/environment.homolog';
import { CreateOrderPayload } from './constant';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly _baseUrl = environment.baseUrl + '/orders';

  constructor(private readonly httpClient: HttpClient) {}

  create(payload: CreateOrderPayload) {
    return this.httpClient.post<BaseRequestResult<null>>(
      this._baseUrl,
      payload
    );
  }
}
