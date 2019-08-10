import React from 'react'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


const blog = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  likes: 12,
  url: 'localhost.com',
  user: {
    name: 'matti'
  }
}

let component

beforeEach(() => {
  component = render(
    <Blog blog={blog} currentUser={{ username: 'testi' }} />
  )
})

test('at the start only name and author are visible', () => {
  const div = component.container.querySelector('.blogSimple')

  expect(div).toBeDefined()
})

test('clicking the blog will reveal full details', () => {
  let div = component.container.querySelector('.blogSimple')

  fireEvent.click(div)

  div = component.container.querySelector('.blogFull')
  expect(div).toBeDefined()

  expect(component.container).toHaveTextContent('localhost.com')
  expect(component.container).toHaveTextContent('added by matti')

  // console.log(prettyDOM(div))
})
