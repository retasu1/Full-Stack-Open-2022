const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

//const { userExtractor } = require('../utils/middleware')
//const mongoose = require('mongoose')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if(!request.user) {
    console.log('no user?')
    return response.status(401).json({ error:'token missing or invalid' })
  }

  const user = request.user
  //console.log(user)
  const blog = new Blog({ ...request.body, user: user.id })

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
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'unauthorised user' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  console.log('blog' + blog)
  console.log(request.params)
  console.log

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      blog,
      { new:true, runValidators: true, context: 'query' }
    )
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter