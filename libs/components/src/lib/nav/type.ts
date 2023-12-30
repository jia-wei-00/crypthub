import { Dispatch, ReactNode } from 'react';

export type PageType = {
  title: string;
  path: string;
  element: ReactNode;
  id: string;
};

export type NavProps = {
  pages: PageType[];
  settings: { title: string }[];
};

export type Action = {
  type: string;
  payload: boolean | string;
};

export type ModalState = {
  deposit_modal: boolean;
  withdraw_modal: boolean;
  forgot_password_modal: boolean;
  auth_modal_active: string;
};

export type HandleModalReducerT = {
  modal?: ModalState;
  dispatch: Dispatch<Action>;
};
