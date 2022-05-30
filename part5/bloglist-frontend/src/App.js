import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify(`${user.name} logged in successfully`)
    } catch (exception) {
      notify(`wrong username or password`, 'alert')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log(`logging ${user.name} out`)

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
        user: user
      }

      setAuthor('')
      setTitle('')
      setUrl('')

      blogService.create(newBlog)
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      notify('missing title or author', 'alert')
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input 
            type="password"
            value={password}
            name="Password"
            onChange={({ target}) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App