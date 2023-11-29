import axios from 'axios';
import { useQuery } from 'react-query';
import { PaymentData } from '../models/payments';
const STALE_TIME = 1000 * 60 * 5;

export const usePayments = () => {
	return useQuery(
		['payments'],
		async () => {
			const result = await axios.get<PaymentData[]>(`https://handcrafted-marketplace.azurewebsites.net/payment`);

			return result.data;
		}, {
		staleTime: STALE_TIME
	});
};