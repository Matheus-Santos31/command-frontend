import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseRequestResult } from '@shared/models/base-request-result';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.homolog';
import { Product, ProductByCategory, ProductCreatePayload } from './constants';

@Injectable({
  providedIn: 'root',
})
export class ProductClientService {
  private readonly _baseUrl = environment.baseUrl + '/products';

  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<BaseRequestResult<Array<Product>>> {
    return this.httpClient.get<BaseRequestResult<Array<Product>>>(
      this._baseUrl
    );
  }

  create(payload: ProductCreatePayload): Observable<BaseRequestResult<null>> {
    return this.httpClient.post<BaseRequestResult<null>>(
      this._baseUrl,
      payload
    );
  }

  getAllGroupedByCategory(): Observable<
    BaseRequestResult<Array<ProductByCategory>>
  > {
    return this.httpClient.get<BaseRequestResult<Array<ProductByCategory>>>(
      this._baseUrl + '/groupedByCategory'
    );
  }
}
