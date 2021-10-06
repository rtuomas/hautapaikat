import axios from 'axios'
//const baseUrl = '/'
const baseUrl = 'http://localhost:3002/api'

const newUser = (username, password, password2) => {
  const request = axios.post(`${baseUrl}/newUser`, {
    username: username,
    password: password,
    password2: password2
  })
  return request.then(response => response.data)
}

const login = (username, password) => {
  const request = axios.post(`${baseUrl}/login`, {
    username: username,
    password: password
  })
  return request.then(response => response.data)
}

const exportedObject = {
  newUser, login
}

export default exportedObject