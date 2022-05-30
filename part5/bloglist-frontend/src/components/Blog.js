import {useState} from 'react'

const Blog = ({blog}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const showWhenVisible = {display: detailsVisible ? '' : 'none'}

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{!detailsVisible ? 'view' : 'hide'}</button>
      <div style={showWhenVisible}>
        {blog.url} <br /> 
        likes {blog.likes} <button>like</button> <br />
        {blog.user.name}
      </div>
    </div> 
  )
}

   


export default Blog