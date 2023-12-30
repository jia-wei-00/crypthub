import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HandleModalReducerT, PriceT } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  walletStore,
  MODALACTIONS,
  AddP2PContractFormT,
} from '@crypthub/store';
import { Button } from '@mui/material';
import { depositSchema } from './schemas';
import CurrencyInput from './numeric-input';

const DepositForm: React.FC<HandleModalReducerT> = ({ dispatch }) => {
  const {
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<AddP2PContractFormT>({
    defaultValues: {
      price: 0,
    },
    resolver: zodResolver(depositSchema),
  });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      dispatch({ type: MODALACTIONS.DEPOSIT, payload: false });
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<PriceT> = (values) => {
    walletStore.deposit(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="deposit-form">
      Put your deposit amount
      <CurrencyInput
        control={control}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        currency="USD"
        name="price"
      />
      <Button type="submit" variant="contained">
        Deposit
      </Button>
    </form>
  );
};

export default DepositForm;
