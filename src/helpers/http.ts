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

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
  }
};

export const apiFactory = (url: string) => ({
  fetch: () => fetch(url, options)
    .then(response => response.json())
    .then(data => {
      return data.data.map((d: any) => ({
        id: d.id,
        ...d.attributes
      }));
    }),
  query: (params:string) => fetch(url+params, options)
    .then(response => response.json())
    .then(data => {
      return data.data.map((d: any) => ({
        id: d.id,
        ...d.attributes
      }));
    }),
  getById: (id: string) => fetch(`${url}/${id}`, options)
    .then(response => response.json())
    .then(data => {
      if (data.error) return data;
              
      return {
        id: data.id,
        ...data.attributes
      };
    })
  ,
  save: ({ id, data }: { id: string | undefined, data: any }) => {
    let myUrl = url;
    let method = 'POST';

    if ((id) && (id !== 'new')) {
      myUrl += `/${id}`;
      method = 'PUT';
    }

    return fetch(myUrl, {
      method,
      headers: options.headers,
      body: JSON.stringify({
        data
      })
    })
  },
})

export const members = apiFactory(conf.membersUrl);
export const books = apiFactory(conf.booksUrl);
export const transactions = apiFactory(conf.transactionsUrl);
export const configurations = apiFactory(conf.configurations); 