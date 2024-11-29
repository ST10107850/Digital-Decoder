import React, { useState } from 'react'
import Hero from '../Components/Hero'
import MyBlogs from '../Components/MyBlogs'

const MyBlogsPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    subcategory: '',
    date: '',
  });


  const handleFilterChange = (newFilters: { search: string; category: string; subcategory: string; date: string }) => {
    setFilters(newFilters);  
  };

  return (
    <div>
        <Hero isBlog={false}  onFilterChange={handleFilterChange} />
        <MyBlogs filters={filters}/>
    </div>
  )
}

export default MyBlogsPage