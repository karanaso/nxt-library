export const conf = {
  booksUrl: 'http://localhost:1337/api/books',
  membersUrl: 'http://localhost:1337/api/members',
  transactionsUrl: 'http://localhost:1337/api/transactions',
}

export const transactions = {
  fetch: () =>
    fetch(conf.transactionsUrl)
      .then(response => response.json())
      .then(data => {
        return data.data.map((d: any) => ({
          id: d.id,
          ...d.attributes
        }));
      })
  ,
}

export const books = {
  fetch: () =>
    fetch(conf.booksUrl)
      .then(response => response.json())
      .then(data => {
        return data.data.map((d: any) => ({
          id: d.id,
          ...d.attributes
        }));
      })
  ,
}

export const members = {
  fetch: () => fetch(conf.membersUrl)
    .then(response => response.json())
    .then(data => {
      return data.data.map((d: any) => ({
        id: d.id,
        ...d.attributes
      }));
    })
};