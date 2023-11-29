export interface PaymentData {
  pagamento: Payment;
  usuario: User;
  produto: Product;
  loja: Store;
}

export interface Payment {
  id: number;
  contaCorrente: string;
  agencia: number;
  status: string;
}

export interface User {
  nome: string;
  cpf: string;
}

export interface Product {
    nome: string;
    preco: number;
}

export interface Store {
    nome: string;
    cnpj: string;
}
