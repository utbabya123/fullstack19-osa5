import React from 'react'
import PropTypes from 'prop-types'
import useField from '../hooks/index'

const BlogForm = ({ addBlog, setFormVisible }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog(title.value, author.value, url.value)
    resetTitle()
    resetAuthor()
    resetUrl()
    setFormVisible(false)
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        title
        <input {...title} />
        <br/>
        author
        <input {...author} />
        <br/>
        url
        <input {...url} />
        <br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  setFormVisible: PropTypes.func.isRequired
}

export default BlogForm