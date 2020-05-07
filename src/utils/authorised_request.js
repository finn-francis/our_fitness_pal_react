import Cookies from 'js-cookie'

export const authorisedHeaders = () => {
  let token = Cookies.get('token')

  return (
    {
      'Authorization': 'Bearer ' + token,
      "Content-Type": "application/json"
    }
  )
}

export const defaultHeaders = () => {
  return (
    {
      "Content-Type": "application/json"
    }
  )
}