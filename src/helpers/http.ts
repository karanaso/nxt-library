export const conf = {
  booksUrl: 'http://server004.sekdev.com:1337/api/books',
  membersUrl: 'http://server004.sekdev.com:1337/api/members',
  transactionsUrl: 'http://server004.sekdev.com:1337/api/transactions',
}

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('jwt')
  }
};

export const apiFactory = (url:string) => ({
  fetch: () =>
    fetch(url, options)
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
      return {
        id: data.data.id,
        ...data.data.attributes
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