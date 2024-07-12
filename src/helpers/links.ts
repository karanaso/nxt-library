import { transactions } from "./http";

export const links = {
  user: {
    signin: '/user/signin',
    forgotPassword: '/user/forgot-password',
    signup: '/user/signup'
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
    edit: (id: string) => `/transactions/${id}`
  },

}