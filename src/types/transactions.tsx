export type TTransaction = {
    id: string;
    bookId: string;
    memberId: string;
    dateOfTransaction: string;
    dateOfReturn: string;
    isReturned: boolean;
  }
  
  export type TTransactions = TTransaction[];