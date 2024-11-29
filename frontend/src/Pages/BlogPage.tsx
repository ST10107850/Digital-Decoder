import React, { useState } from 'react';
import Hero from '../Components/Hero';
import Blogs from '../Components/Blogs';

const BlogPage = () => {
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
     
      <Hero isBlog={false} onFilterChange={handleFilterChange} />

   
      <Blogs filters={filters} />
    </div>
  );
};

export default BlogPage;
