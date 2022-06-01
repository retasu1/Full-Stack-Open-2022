import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user
    }

    setAuthor('')
    setTitle('')
    setUrl('')

    createBlog(newBlog)

  }

  return(
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>title:
        <input
          type="text"
          value={title}
          name="Title"
          id='title'
          onChange={({ target }) => setTitle(target.value)}
          placeholder='title'
        />
      </div>
      <div>author:
        <input
          type="text"
          value={author}
          name="Author"
          id='author'
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='author'
        />
      </div>
      <div>url:
        <input
          type="text"
          value={url}
          name="Url"
          id='url'
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url'
        />
      </div>
      <button type='submit' className='submit-button'>create blog</button>
    </form>
  )
}

BlogForm.displayName = 'BlogForm'

export default BlogForm