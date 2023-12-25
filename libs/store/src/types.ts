export type Action = {
  type: string;
  payload: boolean | string;
};

export type InputData = {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};

export type ModalState = {
  deposit_modal: boolean;
  withdraw_modal: boolean;
  forgot_password_modal: boolean;
  auth_modal_active: string;
};

export type ResetPassword = {
  email: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  token: string;
};

export type PriceT = {
  price: number;
};

export type Wallet = {
  BTC: number;
  ETH: number;
  USD: number;
};

export type P2PCompletedHistoryT = {
  coin_amount: number;
  completed_at: EpochTimeStamp;
  created_at: EpochTimeStamp;
  currency: string;
  selling_price: number;
  transaction_type: string;
};

export type Transaction = {
  coin_amount: number;
  commission: number | string;
  currency: string;
  date: EpochTimeStamp;
  id: number;
  transaction_amount: number;
  type: string;
};

export type TransactionDateFromAPI = {
  coin_amount: number;
  commission_deduction_5: number | string;
  currency: string;
  trade_type: string;
  transaction_amount: number;
  transaction_date: string;
  transaction_id: number;
  user_id: number;
  wallet_id: number;
};

export type WalletHistoryT = {
  type: string;
  before: number;
  after: number;
  amount: number;
  created_at: number;
};

export type AddP2PContractFormT = {
  currency?: string;
  coin_amount?: number;
  price: number;
  active?: string;
};

export type P2PContractsT = {
  coin_amount: number;
  contract_id: string;
  created_at: number;
  currency: string;
  seller_id: string;
  selling_price: number;
};
