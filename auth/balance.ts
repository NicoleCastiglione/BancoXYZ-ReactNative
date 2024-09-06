import { apiBalance } from '@/api/apiBalance';
import { Balance } from '@/services/balance.responses';

export const getBalance = async(): Promise<Balance> => {
  try {
      const { data } = await apiBalance.get<Balance>('balance')
    return data;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

