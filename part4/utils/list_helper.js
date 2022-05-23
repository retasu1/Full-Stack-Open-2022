const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)

  return likes
}

const favouriteBlog = (blogs) => {
  //console.log(blogs.length)

  if (blogs.length === 0) {
    return {}
  }

  return blogs.reduce((fav, blog) => {
    if (blog.likes > fav.likes) {
      return blog
    } else {
      //console.log(fav.likes)
      return fav
    }
  }, { likes: 0 })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return ''
  }

  //console.log(blogs[0].author)
  let authorCounts = _.countBy(blogs, 'author')
  console.log(authorCounts)

  let author = Object.keys(authorCounts).reduce((a, b) => authorCounts[a] > authorCounts[b] ? a : b)
  console.log(author)

  return author
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}