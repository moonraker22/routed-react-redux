import { useAddCommentMutation } from '../features/api/apiSlice'
import { useState } from 'react'

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const [addComment] = useAddCommentMutation()

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    const newComment = {
      comment,
      id: blog.id,
    }
    try {
      await addComment(newComment)
      setComment('')
    } catch (exception) {
      console.error('error: ', exception)
    }
  }

  return (
    <form onSubmit={handleCommentSubmit} data-testid='comment-form'>
      <div>
        <label htmlFor='Comment'>Comment:</label>
        <input
          type='text'
          value={comment}
          name='Comment'
          onChange={({ target }) => setComment(target.value)}
          data-testid='comment-input'
        />
      </div>
      <div>
        <button type='submit' data-testid='comment-button'>
          SAVE
        </button>
      </div>
    </form>
  )
}

export default CommentForm
