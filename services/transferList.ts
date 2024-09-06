import { apiTransferList } from '@/api/apiTransferList';
import { TransferListResponse } from '../interfaces/transferList.responses'

export const getTransfers = async (): Promise<TransferListResponse> => {
  try {
    const { data } = await apiTransferList.get<TransferListResponse>('transferList');
    return data;
  } catch (error) {
    console.error('Error fetching transfers:', error);
    throw error;
  }
};