const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  console.log(body)

  const user = body.userId
    ? await User.findById(blog.userId)
    : await User.findOne()

  console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (!blog.author || !blog.url) {
    return response.status(400).end()
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  console.log(request.params.id)
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/', async (request, response, next) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter