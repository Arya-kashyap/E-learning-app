import React from 'react'
import Hero from '../components/Hero'
import CourseCard from '../components/CourseCard'
import Footer from '../components/Footer'

function Home() {
     return (
          <div className='w-full min-h-screen dark:bg-zinc-800'>
               <Hero />
               <CourseCard />
               <Footer />
          </div>
     )
}

export default Home
