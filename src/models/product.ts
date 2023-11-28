export interface ProductData {
	product: Product;
	store: Store;
}

export interface Product {
	id: number;
	name: string;
	price: number;
}

export interface Store {
	name: string;
	cnpj: string;
}