let token = null

const blogs = [
  {
    title: 'Testi1',
    author: 'k1',
    url: 'localhost',
    likes: 12,
    user: {
      username: 'mmeika',
      name: 'Matti Meikäläinen',
      id: '5cb46cf57610b508e081f796'
    },
    id: '5cb660e9730aa52fe89921df'
  },
  {
    title: 'Testiblogi',
    author: 'Anssi',
    url: 'www.yle.fi',
    likes: 8,
    user: {
      username: 'pasi',
      name: 'Pasi Anssi',
      id: '5cb4cc36c34a162730ebfd19'
    },
    id: '5d3de3ead159fe1cb0a09df8'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getToken = () => {
  return token
}

export default { getAll, setToken, getToken }