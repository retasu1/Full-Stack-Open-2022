import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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
})

