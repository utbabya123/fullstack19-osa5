import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  console.log('------------')
  console.log(id)
  console.log(newObject)
  console.log('------------')
  console.log(`${baseUrl}/${id}`)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const getToken = () => {
  return token
}

export default { getAll, setToken, create, update, getToken }