import { Dispatch, SetStateAction } from 'react';

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
