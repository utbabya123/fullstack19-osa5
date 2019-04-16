import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (title, author, url) => {
    try {
      const blogObject = {
        title,
        author,
        url
      }

      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      displayNotification('message', `a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (err) {
      console.log(err)
    }
  }
    
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')   
    } catch (err) {
      console.log(err)
      displayNotification('error', 'wrong username or password')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const displayNotification = (type, content) => {
    if (type === 'message') {
      setMessage(content)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } else {
      setError(content)
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification content={error} type='error' /> 
        <Notification content={message} type='message' />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification content={error} type='error' /> 
      <Notification content={message} type='message' />
      <h2>blogs</h2>
      <p>{user.username} logged in </p><button onClick={handleLogout}>logout</button>
      <BlogForm addBlog={addBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App