import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '@client/products';
import { BaseRequestResult } from '@shared/models/base-request-result';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.homolog';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryClientService {
  private readonly _baseUrl = environment.baseUrl + '/productCategory';

  constructor(private readonly httpClient: HttpClient) {}

  create(payload: ProductCategory): Observable<BaseRequestResult<null>> {
    return this.httpClient.post<BaseRequestResult<null>>(
      this._baseUrl,
      payload
    );
  }

  getAll(): Observable<BaseRequestResult<Array<ProductCategory>>> {
    return this.httpClient.get<BaseRequestResult<Array<ProductCategory>>>(
      this._baseUrl
    );
  }
}
