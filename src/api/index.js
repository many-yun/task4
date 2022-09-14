import axios from 'axios'

export const Axios = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
  params: {
    auth: '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',
  },
})
