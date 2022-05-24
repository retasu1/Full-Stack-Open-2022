const { forEach } = require('lodash')
const _ = require('lodash')

const dummy = (_blogs) => {
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
  } else if (blogs.length === 1) {
    return {author: blogs[0].author, blogs: 1}
  }

  let authorCounts = _.countBy(blogs, 'author')

  let author = Object.keys(authorCounts).reduce((a, b) => authorCounts[a] > authorCounts[b] ?
    { author: a, blogs: authorCounts[a] } :
    { author: b, blogs: authorCounts[b] })
  console.log(author)

  return author
}

const mostLikes = (blogs) => {
  let mostLikedAuthor = {
    author: '',
    likes: 0
  }

  if (blogs.length === 0) {
    return {}
  } else if (blogs.length === 1) {
    return { author: blogs[0].author, likes: blogs[0].likes }
  }

  let authors = _.groupBy(blogs, 'author')
  for (const author in authors) {
    let authorBlogs = authors[author]
    let authorLikes = 0
    authorBlogs.forEach(blog => authorLikes += blog.likes)

    if (authorLikes > mostLikedAuthor.likes) {
      mostLikedAuthor.author = author,
      mostLikedAuthor.likes = authorLikes
    }
  }

  console.log(mostLikedAuthor)

  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}