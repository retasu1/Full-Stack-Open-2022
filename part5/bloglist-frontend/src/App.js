import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      //console.log(user)

      notify(`${user.name} logged in successfully`)
    } catch (exception) {
      notify(`wrong username or password`, 'alert')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log(`logging ${user.name} out`)

    window.localStorage.removeItem('loggedBlogappUser')
    await setUser(null)
    notify(`logged out successfully`)
    //console.log(user)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const result = await blogService.create(blogObject)
    setBlogs(blogs.concat(result))
    notify(`a new blog ${blogObject.title} by ${blogObject.author} added`)
  }

  const deleteBlog = (blogObject) => {
    return async () => {
      const ok = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    
      if (ok) {
        await blogService.remove(blogObject.id)
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs)
        notify(`b${blogObject.title} by ${blogObject.author} has been deleted`)
      }
    }
  }

  const blogFormRef = useRef()

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

  //note that the sort order doesn't change on like click
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <BlogForm createBlog={addBlog} user={user}/>
      </Togglable>
      
      {blogs
        .sort((firstBlog, secondBlog) => firstBlog.likes-secondBlog.likes)
        .reverse()
        .map(blog =><Blog key={blog.id} blog={blog} currentUser={user} handleBlogDelete={deleteBlog(blog)}/>
      )}

    </div>
  )
}


export default App
