import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, currentUser, handleBlogDelete}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = {display: detailsVisible ? '' : 'none'}

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  //console.log(blog)
  //console.log(currentUser)
  const showWhenCorrectUser = {display: blog.user.username === currentUser.username ? '' : 'none'}
 // console.log(isAddedByUser)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async (event) => {
    event.preventDefault()
    console.log(`${blog.title + ' ' + blog.author} liked!`)
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes : likes+1
    }
    await blogService.update(blog.id, updatedBlog)
    setLikes(likes + 1)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{!detailsVisible ? 'view' : 'hide'}</button>
      <div style={showWhenVisible}>
        {blog.url} <br /> 
        likes {likes} <button onClick={handleLike}>like</button> <br />
        {blog.user.name}
      </div>
      <button style={showWhenCorrectUser} onClick={handleBlogDelete}>remove</button>

    </div> 
  )
}

export default Blog