export type TTransaction = {
    _id: string;
    bookId: string;
    memberId: string;
    dateOfTransaction: string;
    dateOfReturn: string;
  }
  
  export type TTransactions = TTransaction[];