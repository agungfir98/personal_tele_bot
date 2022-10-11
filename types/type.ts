export interface Ide {
  name: string;
}
export interface balance {
  bank: string;
  balance: number;
  in_wallet: number;
  history: balanceHistory[];
}
export interface balanceHistory {
  bank: any;
  date: Date;
  title: string;
  type: string;
  value: number;
  balance: number;
  in_wallet: number;
  balance_left: number;
  in_wallet_left: number;
}
