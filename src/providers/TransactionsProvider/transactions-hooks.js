import {useContext, useEffect, useState} from 'react';

import {TransactionsContext} from './transactions-context';

export const useTransactions = () => useContext(TransactionsContext);

export const useTransaction = hash => {
  const {transactions} = useTransactions();
  const [transaction, setTransaction] = useState();
  useEffect(() => {
    const storedTransaction = transactions.find(stored => stored.hash === hash);
    if (storedTransaction) {
      setTransaction(storedTransaction);
    }
  }, [transactions, hash]);
  return transaction;
};
