import BlogDetails from "../Components/BlogDetails"
import Hero from "../Components/Hero"


const BlogsDetailPage = () => {
  return (
    <div>
      <Hero isBlog={true}/>
      <BlogDetails/>
    </div>
  )
}

export default BlogsDetailPage
