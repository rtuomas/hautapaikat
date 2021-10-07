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

const newGrave = (newGrave) => {
  const request = axios.post(`${baseUrl}/addDead`, {newGrave})
  return request.then(response => response.data)
}

const loadGraves = async () => {
  const response = await axios.get(`http://localhost:3002`)
  return response.data
}

const exportedObject = {
  newUser, login, newGrave, loadGraves
}



export default exportedObject