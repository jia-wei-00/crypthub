import { AddP2PContractFormT } from '@crypthub/store';
import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { FAQDataProps } from '../faq/type';

export type BooleanState = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

export type ModalState = {
  deposit_modal: boolean;
  withdraw_modal: boolean;
  forgot_password_modal: boolean;
  auth_modal_active: string;
};

export type Action = {
  type: string;
  payload: boolean | string;
};

export type HandleModalReducerT = {
  modal?: ModalState;
  dispatch: Dispatch<Action>;
};

export type SellOnMarketT = {
  sellModal?: boolean;
  setSellModal: React.Dispatch<React.SetStateAction<boolean>>;
  active?: string;
};

export type InputData = {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};

export type PriceT = {
  price: number;
};

export type CurrencyFormatterT = {
  control: Control<AddP2PContractFormT>;
  errors: FieldErrors<AddP2PContractFormT>;
  getValues: UseFormGetValues<AddP2PContractFormT>;
  setValue: UseFormSetValue<AddP2PContractFormT>;
  currency: string;
  name: keyof AddP2PContractFormT;
  label?: string;
};

export type BooleanStateT = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  faq_data: FAQDataProps[];
};

export type ModalStateT = {
  crypthub_trader_modal: boolean;
  p2p_trader_modal: boolean;
};

export type ActionT = {
  type: string;
};

export type ModalPropsT = {
  modal: ModalStateT;
  dispatch: Dispatch<ActionT>;
  data: { image: string; details: string }[];
};
