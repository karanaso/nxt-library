// https://postgrest.org/en/v11/references/errors.html

import { links } from "./links";

export const conf = {
  auth: {
    signin: 'http://localhost:3000/books/user/signin',
    signup: 'http://localhost:3000/books/user/signup',
  },
  booksUrl: 'http://localhost:3000/books/books',
  configurations: 'http://localhost:3000/books/configurations',
  membersUrl: 'http://localhost:3000/books/members',
  transactionsUrl: 'http://localhost:3000/books/transactions',
}

const options = () => ({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
  }
});


const jwtHandler = (data:any) => {
  console.log(data);
  if (data) {
    if (data.code) {
      if (data.code.includes('PGRST3')) return document.location.href=links.user.signout;
    }
  }
  return data;
}

export const apiFactory = (url: string) => ({
  fetch: () => fetch(url, options())
    .then(response => response.json())
    .then(data => jwtHandler(data))
    .then(data => {
      // if (data.message.includes('JWT')) return document.location.href=links.user.signout;
      return data;
    }),
  query: (params:string) => fetch(url+params, options())
    .then(response => response.json())
    .then(data => jwtHandler(data))
    .then(data => {
      return data.data.map((d: any) => ({
        id: d.id,
        ...d.attributes
      }));
    }),
  getById: (id: string) => fetch(`${url}?id=eq.${id}&select=*`, options())
    .then(response => response.json())
    .then(data => jwtHandler(data))
    .then(data => data[0]),
  save: ({ id, data }: { id: string | undefined, data: any }) => {
    let myUrl = url;
    let method = 'POST';

    if ((id) && (id !== 'new')) {
      myUrl += `?id=eq.${id}`;
      method = 'PATCH';
    }

    return fetch(myUrl, {
      method,
      headers: options().headers,
      body: JSON.stringify({
        ...data
      })
    })
    .then(data => jwtHandler(data))
  },
})

export const members = apiFactory(conf.membersUrl);
export const books = apiFactory(conf.booksUrl);
export const transactions = apiFactory(conf.transactionsUrl);
export const configurations = apiFactory(conf.configurations); 