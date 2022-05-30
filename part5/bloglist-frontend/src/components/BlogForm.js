import { useState } from 'react'

const BlogForm = ({ createBlog, user}) => {
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
          onChange={({ target }) => setTitle(target.value)}
          />
      </div>
      <div>author: 
        <input 
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>url: 
        <input 
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm