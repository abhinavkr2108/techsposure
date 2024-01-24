import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

function Layout() {
  return (
    <div>
        <Header/>
            <Box pt={12} bgColor={"gray.50"}><Outlet/></Box>
        <Footer/>
    </div>
  )
}


export default Layout