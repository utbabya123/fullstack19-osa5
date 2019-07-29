import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import useField from './hooks/index'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
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

  const deleteBlog = async (event, blog) => {
    event.stopPropagation()
    try {
      if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        displayNotification('message', 'blog removed')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleLike = async (event, blog) => {
    event.stopPropagation()
    try {
      const blogObject = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user ? blog.user.id : null
      }

      const newBlog = await blogService.update(blogObject.id, blogObject)
      const newBlogs = [...blogs].map(blog => blog.id === newBlog.id ? newBlog : blog)

      setBlogs(newBlogs)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      resetUsername()
      resetPassword()
      setUser(user)
    } catch (err) {
      resetUsername()
      resetPassword()
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

  const blogForm = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>create new</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm addBlog={addBlog} setFormVisible={setFormVisible}/>
          <button onClick={() => setFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
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
            <input {...username} />
          </div>
          <div>
            salasana
            <input {...password} />
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
      {blogForm()}
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} deleteBlog={deleteBlog} currentUser={user} handleLike={handleLike} blog={blog} />
      )}
    </div>
  )
}

export default App