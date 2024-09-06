export interface TransferListResponse {
    value: number;
    date: string;
    currency: string;
    payeer: {
        document: string;
        name: string;
    }
}

export interface TransferListResponse {
  message: string;
  transfers: TransferListResponse[];
}