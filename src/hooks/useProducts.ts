import axios from 'axios';
import { useQuery } from 'react-query';
import { ProductData } from '../models/product';
const STALE_TIME = 1000 * 60 * 5;

export const useProducts = () => {
	return useQuery(
		['products'],
		async () => {
			const result = await axios.get<ProductData[]>(`https://handcrafted-marketplace.azurewebsites.net/product`);

			return result.data;
		}, {
		staleTime: STALE_TIME
	});
};