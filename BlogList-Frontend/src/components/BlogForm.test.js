import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { act } from 'react-dom/test-utils'

describe('Blog Form Tests', () => {
  let component
  const setBlogs = jest.fn()
  const blogs = []
  const setMessage = jest.fn()
  const setUser = jest.fn()

  const blogService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'Test URL',
    likes: 0,
  }
  beforeEach(() => {
    component = render(
      <BlogForm
        setBlogs={setBlogs}
        blogs={blogs}
        setMessage={setMessage}
        setUser={setUser}
        blogService={blogService}
        blog={blog}
      />
    )
  })

  it('renders the blog form component', () => {
    expect(component.container).toHaveTextContent('Title')
    expect(component.container).toHaveTextContent('Author')
    expect(component.container).toHaveTextContent('URL')
    expect(component.container).toHaveTextContent('SAVE')
  })

  it('calls the blogService create method when the form is submitted', async () => {
    const saveButton = screen.getByText('SAVE')
    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')
    // const form = screen.getByTestId('blog-form')

    userEvent.type(titleInput, 'Test Title')
    userEvent.type(authorInput, 'Test Author')
    userEvent.type(urlInput, 'Test URL')

    await act(async () => {
      userEvent.click(saveButton)
    })
    screen.debug(component.container)

    expect(titleInput.value).toBe('')
    expect(authorInput.value).toBe('')
    expect(urlInput.value).toBe('')
    // expect(blogService.create).toHaveBeenCalledTimes(1)
    expect(blogService.create).toHaveBeenCalledWith(blog)
  })
})
