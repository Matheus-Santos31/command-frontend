export interface Client {
  id: number;
  name: string;
  document: string;
  hasTicket: boolean;
}

export interface CreateClientPayload {
  name: string;
  document: string;
}

export interface GetClientByDocumentPayload {
  document: string;
}
