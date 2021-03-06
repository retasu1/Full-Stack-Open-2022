import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
  let container

  const blog = {
    title: 'Title of blog',
    author: 'Blog Author',
    likes: 7,
    url: 'www.blog.com',
    user: {username: 'Jane27'},
  }
  const currentUser = {username:"Jane27"}

  beforeEach(() => {
    container = render(
      <Blog blog={blog} currentUser={currentUser}/>
    ).container
  })

  test('renders blog', () => {
    const div = container.querySelector('.blog')
  
    expect(div).toHaveTextContent('Title of blog')
    expect(div).toHaveTextContent('Blog Author')
  
    //const element = screen.getByText('Title of blog')
  })

  test('details are hidden', () => {
    const div = container.querySelector('.blog-details')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, details are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-details')
    expect(div).not.toHaveStyle('display: none')
  })
})

test('likes are registered', async () => {
  const handleLikeTest = jest.fn()
  const user = userEvent.setup()

  const blog = {
    title: 'Title of blog',
    author: 'Blog Author',
    likes: 7,
    url: 'www.blog.com',
    user: {username: 'Jane27'},
  }
  const currentUser = {username:"Jane27"}

  render(<Blog blog={blog} currentUser={currentUser} handleLikeTest={handleLikeTest}/>)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(handleLikeTest.mock.calls).toHaveLength(2)
  
})
