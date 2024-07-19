export type TMemberOrBook = {
  member: 'member',
  book: 'book',
}
export const links = {
  user: {
    signin: '/user/signin',
    forgotPassword: '/user/forgot-password',
    signup: '/user/signup',
    signout: '/user/logout',
    configuration: '/user/configuration',
  },
  home: {
    index: '/',
  },
  members: {
    list: '/members',
    new: '/members/new',
    edit: (id: string) => `/members/${id}`
  },
  books: {
    list: '/books',
    new: '/books/new',
    edit: (id: string) => `/books/${id}`
  },
  transactions: {
    list: '/transactions',
    new: '/transactions/new',
    edit: (id: string) => `/transactions/${id}`,
    byBemberId: (memberOrBook: TMemberOrBook | string, id: string) => `/transactions/${memberOrBook}/${id}`,
  },
}

export const unsecureLinks = [
  links.user.signin,
  links.user.signup,
  links.user.forgotPassword,
  links.user.signout,
]