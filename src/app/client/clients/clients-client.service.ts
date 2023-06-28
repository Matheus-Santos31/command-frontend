import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRequestResult } from '@shared/models/base-request-result';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.homolog';
import { Client, CreateClientPayload, GetClientByDocumentPayload } from '.';

@Injectable({
  providedIn: 'root',
})
export class ClientsClientService {
  private readonly _baseUrl = environment.baseUrl + '/clients';

  constructor(private readonly httpClient: HttpClient) {}

  create(payload: CreateClientPayload): Observable<BaseRequestResult<Client>> {
    return this.httpClient.post<BaseRequestResult<Client>>(
      this._baseUrl,
      payload
    );
  }

  getByDocument(
    payload: GetClientByDocumentPayload
  ): Observable<BaseRequestResult<Client>> {
    return this.httpClient.get<BaseRequestResult<Client>>(
      `${this._baseUrl}/getByDocument/${payload.document}`
    );
  }
}
