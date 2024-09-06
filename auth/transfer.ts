import { apiTransfer } from "../api/apiTransfer";
import { TransferData } from "@/services/transfers.responses";
    
export const postTransfer = async (transferData: TransferData) => {
  try {
    const { data } = await apiTransfer.post<{ status: string }>('transfer', transferData);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};