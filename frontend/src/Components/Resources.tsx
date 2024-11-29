import React from 'react'
import CardComponents from './CardComponents'

const Resources = () => {
  return (
          <div className="mt-5 px-[150px]">
          {/* Header Section */}
          <div className="w-full bg-[#b0764d] flex justify-center py-4 shadow-md">
        <h1 className="text-2xl font-bold text-white uppercase">Development Topics</h1>
      </div>
    
          {/* Card Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Reusable Cards */}
            <CardComponents />
            <CardComponents />
            <CardComponents />
          </div>
        </div>
  )
}

export default Resources
