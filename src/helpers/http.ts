export const fetchMembers = () =>
  fetch('http://localhost:3000/library/members')
    .then(response => response.json())

export const fetchBooks = () =>
  fetch('http://localhost:3000/library/books')
    .then(response => response.json())

export const fetchTransactions = () =>
  fetch('http://localhost:3000/library/transactions')
    .then(response => response.json())