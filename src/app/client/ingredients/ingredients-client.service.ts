import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseRequestResult } from '@shared/models/base-request-result';
import { environment } from 'src/environments/environment.homolog';
import { CreateIngredientPayload, Ingredient } from '.';

@Injectable({
  providedIn: 'root',
})
export class IngredientClientService {
  private readonly _baseUrl = environment.baseUrl + '/ingredients';

  constructor(private readonly httpClient: HttpClient) {}

  create(
    payload: CreateIngredientPayload
  ): Observable<BaseRequestResult<null>> {
    return this.httpClient.post<BaseRequestResult<null>>(
      this._baseUrl,
      payload
    );
  }

  edit({ id, ...payload }: Ingredient): Observable<BaseRequestResult<null>> {
    return this.httpClient.patch<BaseRequestResult<null>>(
      `${this._baseUrl}/${id}`,
      payload
    );
  }

  getAll(): Observable<BaseRequestResult<Array<Ingredient>>> {
    return this.httpClient.get<BaseRequestResult<Array<Ingredient>>>(
      this._baseUrl
    );
  }
}
