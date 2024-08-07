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

export const isLoggedIn = () => {
  return localStorage.getItem('jwt') ? true : false;
}
const jwtOrLogin = ({ secure = true } = {}) => {  
  return new Promise((resolve, reject) => {
    if (secure) {
      if (!localStorage.getItem('jwt')) {
        resolve(false);
        return document.location.href = links.user.signin;
      }
      return resolve({});
    } else {
      return resolve({});
    }
  });
}

const jwtHandler = (data: any) => {
  if (data) {
    if (data.code) {
      if (data.code.includes('PGRST3')) return document.location.href = links.user.signout;
    }
  }
  return data;
}

export const apiFactory = (url: string) => ({
  fetch: () => jwtOrLogin({ secure: true })
    .then(() => {
      return fetch(url, options())
        .then(response => response.json())
        .then(data => jwtHandler(data))
        .then(data => {
          return data.map((d: any) => ({
            id: d._id,
            ...d
          }))
        })
    }),
  query: (params: string) => jwtOrLogin({ secure: true })
    .then(() => {
      return fetch(url + params, options())
        .then(response => response.json())
        .then(data => jwtHandler(data))
        .then(data => {
          return data.data.map((d: any) => ({
            id: d._id,
            ...d
          }));
        })
    }),
  getById: (id: string) => jwtOrLogin({ secure: true })
    .then(() => {
      return fetch(`${url}/${id}`, options())
        .then(response => response.json())
        .then(data => jwtHandler(data))
        .then(data => data[0])
    }),
  save: ({ id, data }: { id: string | undefined, data: any }) => {
    let myUrl = url;
    let method = 'POST';

    if ((id) && (id !== 'new')) {
      myUrl += `?id=eq.${id}`;
      method = 'PATCH';
    }

    return jwtOrLogin({ secure: true })
      .then(() => {
        return fetch(myUrl, {
          method,
          headers: options().headers,
          body: JSON.stringify({
            ...data
          })
        })
          .then(data => jwtHandler(data))
      })
  },
})

export const members = apiFactory(conf.membersUrl);
export const books = apiFactory(conf.booksUrl);
export const transactions = apiFactory(conf.transactionsUrl);
export const configurations = apiFactory(conf.configurations); 