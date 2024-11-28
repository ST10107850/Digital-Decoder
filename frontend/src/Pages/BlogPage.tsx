import React from 'react'
import Hero from '../Components/Hero'
import BlogDetails from '../Components/BlogDetails'
import Blogs from '../Components/Blogs'

const BlogPage = () => {
  return (
    <div>
      <Hero isBlog={false}/>
      <Blogs/>
    </div>
  )
}

export default BlogPage
