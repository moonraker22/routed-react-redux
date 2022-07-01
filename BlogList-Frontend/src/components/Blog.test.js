import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { act } from 'react-dom/test-utils'

describe('Blog List Tests', () => {
  let component
  beforeEach(() => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      url: 'Test URL',
      likes: 0,
      user: {
        name: 'Test User',
        username: 'Test Username',
        id: '34345klj35kj53lkjk53lk53',
      },
    }

    const blogService = {
      create: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    }

    const setBlogs = jest.fn()
    const setLikes = jest.fn((likes) => {
      return likes + 1
    })

    const blogs = []

    component = render(
      <Blog
        blog={blog}
        setBlogs={setBlogs}
        blogs={blogs}
        blogService={blogService}
        setLikes={setLikes}
      />
    )
  })

  it('renders the blog title and author, but does not render its url or number of likes by default', () => {
    expect(component.container).toHaveTextContent('Test Title By: Test Author')

    expect(component.container).toHaveTextContent('Test URL')

    expect(component.container).toHaveTextContent('0 likes')

    const hiddenDiv = component.container.querySelector('.hidden')

    expect(hiddenDiv).toHaveStyle('display: none')

    // screen.debug(component.container)
  })

  it('renders the blog url and number of likes when the view button is clicked', () => {
    const viewButton = component.getByText('View')

    act(() => {
      viewButton.click()
    })

    expect(component.container).toHaveTextContent('Test URL')

    expect(component.container).toHaveTextContent('0 likes')

    const hiddenDiv = component.container.querySelector('.hidden')

    expect(hiddenDiv).not.toHaveStyle('display: none')
  })

  it('clicking the like button twice calls the event handler twice', async () => {
    const likeButton = component.getByText('like')

    act(() => {
      fireEvent.click(likeButton)
      fireEvent.click(likeButton)
    })
    expect(component.container).toHaveTextContent('2 likes')
  })
})
