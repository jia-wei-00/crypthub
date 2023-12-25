import axios, { AxiosError } from 'axios';
import { authStore, p2pStore } from '@crypthub/store';
import { FirebaseError } from '@firebase/util';

export type ErrorResponse = {
  message: string;
  errors: {
    msg: string;
  }[];
};

export type P2PContractsT = {
  coin_amount: number;
  contract_id: string;
  created_at: number;
  currency: string;
  seller_id: string;
  selling_price: number;
};

export const createTimeoutPromise = (timeout: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('Request timed out. Please try again later.');
    }, timeout);
  });
};

//Rewrite all the successful message
export const handleSuccess = (msg: string) => {
  switch (msg) {
    case 'BUY_ORDER_SUCCESS':
      return 'Buy order successful';
    case 'DEPOSIT_SUCCESS':
      return 'Successfully deposited';
    case 'RESET_PASSWORD_SUCCESS':
      return 'Successfully reset password';
    case 'WITHDRAW_SUCCESS':
      return 'Successfully withdrawn';
    case 'LOGOUT_SUCCESS':
      return 'Successfully Logout';
    case 'USER_CREATED':
      return 'Check your email to activate account';
    case 'EMAIL_SENT':
      return 'Check your email to reset password';
    case 'CONTRACT_ADDED':
      return 'Contract added sucessfully';
    case 'CONTRACT_PURCHASE_SUCCESFUL':
      return 'Buy Sucessful';
    case 'CONTRACT_DELETED':
      return 'Contract deleted';
    case 'SELL_ORDER_SUCCESS':
      return 'Sell order successful';
    default:
      return msg;
  }
};

export const handleErrors = (error: string) => {
  switch (error) {
    case 'AUTHENTICATION_FAILED':
      authStore.reset();
      return 'Session expired please login again!';
    case 'Contract had already been bought/withdrawed':
      p2pStore.fetchP2PMarket();
      return error;
    default:
      return error;
  }
};

export const firebaseError = (error: FirebaseError) => {
  if (error instanceof FirebaseError) {
    const errorMessageWithoutPrefix = error.message.replace('Firebase: ', '');
    return errorMessageWithoutPrefix;
  } else {
    return `${error}`;
  }
};

export const errorChecking = (error: AxiosError<ErrorResponse>) => {
  let message: string;

  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.data.message) {
        message = handleErrors(error.response.data.message);
      } else {
        message = error.response.data.errors[0].msg;
      }
    } else if (error.message) {
      message = error.message;
    } else {
      message = 'An unknown error occurred in axios';
    }
  } else {
    message = error;
  }

  return message;
};

//filter contracts for p2p market
export const filterContracts = (
  contracts: P2PContractsT[],
  checked: boolean[],
  value: { coin: number[]; price: number[] }
): P2PContractsT[] => {
  return contracts
    .filter((contract) => {
      if (checked[0] && checked[1]) {
        return true; // Show all items if both checkboxes are checked
      } else if (checked[0] && contract.currency === 'ETH') {
        return true; // Show only "ETH" items if the "ETH" checkbox is checked
      } else if (checked[1] && contract.currency === 'BTC') {
        return true; // Show only "BTC" items if the "BTC" checkbox is checked
      }
      return false;
    })
    .filter((contract) => {
      const price = contract.selling_price;
      if (price >= value.price[0]) {
        if (value.price[1] >= 60000) {
          return true; // No upper limit if the max value is above 60,000
        } else {
          return price <= value.price[1]; // Apply the upper limit if it's below or equal to 60,000
        }
      }
      return false;
    })
    .filter((contract) => {
      const price = contract.coin_amount;
      if (price >= value.coin[0]) {
        if (value.coin[1] >= 50) {
          return true; // No upper limit if the max value is above 50
        } else {
          return price <= value.coin[1]; // Apply the upper limit if it's below or equal to 50
        }
      }
      return false;
    });
};
