import { url } from "inspector";

export const conf = {
  booksUrl: 'http://localhost:1337/api/books',
  membersUrl: 'http://localhost:1337/api/members',
  transactionsUrl: 'http://localhost:1337/api/transactions',
}

export const apiFactory = (url:string) => ({
  fetch: () =>
    fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.data.map((d: any) => ({
          id: d.id,
          ...d.attributes
        }));
      }),
  getById: (id: string) => fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(data => {
      return {
        id: data.data.id,
        ...data.data.attributes
      };
    })
  ,
})

export const members = apiFactory(conf.membersUrl);
export const books = apiFactory(conf.booksUrl);
export const transactions = apiFactory(conf.transactionsUrl); 