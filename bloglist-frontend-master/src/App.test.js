import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if user not logged in shows login form', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.loginform')
    )

    const loginForm = component.container.querySelector('.loginForm')

    expect(loginForm).toBeDefined()
    expect(component.container).toHaveTextContent('Log in to application')
  })

  test('when user is logged in blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.bloglist')
    )

    const bloglist = component.container.querySelector('.bloglist')
    expect(bloglist).toBeDefined()

    const blogs = component.container.querySelectorAll('.blogSimple')
    expect(blogs.length).toBe(2)

    expect(component.container).toHaveTextContent('Testi1')
    expect(component.container).toHaveTextContent('Testiblogi')
  })
})