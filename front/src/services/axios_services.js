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
  return request.then(response => response)
}

const newGrave = (newGrave) => {
  const accessTokenObj = JSON.parse(localStorage.getItem("myToken"))
  const request = axios
    .post(
      `${baseUrl}/addDead`,
        newGrave,
      { headers: {Authorization: 'Bearer: ' + accessTokenObj} }
  )
  return request.then(response => response.data)
}

const loadGraves = async () => {
  const response = await axios.get(`http://localhost:3002`)
  return response.data
}

const checkLogin = () => {
  const token = JSON.parse(localStorage.getItem("myToken"))
  const request = axios
    .post(
      `${baseUrl}/checkLogin`,
      { headers: {Authorization: 'Bearer: ' + token} }
  )
  return request.then(response => response)
}

const exportedObject = {
  newUser, login, newGrave, loadGraves, checkLogin
}



export default exportedObject