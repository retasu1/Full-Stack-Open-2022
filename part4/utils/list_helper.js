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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}