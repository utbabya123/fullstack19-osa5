import React, { useState } from 'react'

const Blog = ({ blog, handleLike, currentUser, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!visible) {
    return (
      <div onClick={() => setVisible(true)} style={blogStyle} className='blogSimple'>
        {blog.title} {blog.author}
      </div>
    )
  }

  return (
    <div onClick={() => setVisible(false)} style={blogStyle} className='blogFull'>
      <p>{blog.title} {blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} <button onClick={(event) => handleLike(event, blog)}>like</button></p>
      <p>added by {blog.user !== undefined ? blog.user.name : 'anonymous'}</p>
      {blog.user.username === currentUser.username && <button onClick={(event) => deleteBlog(event, blog)}>remove</button>}
    </div>
  )
}

export default Blog