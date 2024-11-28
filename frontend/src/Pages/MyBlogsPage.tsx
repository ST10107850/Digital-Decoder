import React from 'react'
import Hero from '../Components/Hero'
import MyBlogs from '../Components/MyBlogs'

const MyBlogsPage = () => {
  return (
    <div>
        <Hero isBlog={false}/>
        <MyBlogs/>
    </div>
  )
}

export default MyBlogsPage