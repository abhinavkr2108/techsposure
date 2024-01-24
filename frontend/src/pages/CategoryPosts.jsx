import { Box, Container, Heading } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function CategoryPosts() {
  const location = useLocation();
  const state = location.state;
  const category = state.category;

  const [categoryPosts, setCategoryPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(()=>{
    fetchCategoryPosts();
  },[])

  const fetchCategoryPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_POST_BASE_URL}/categories/${category}`);
      // console.log(response);
      const posts = await response.data.categoryPosts;
      setCategoryPosts(posts);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    } 
  }
  return (
    <div className='pt-12 h-screen'>
      <Heading className='text-center'>
        Posts on {category}
      </Heading>
      
      <Box maxW={"8xl"} mx={"auto"} py={8}>
        <Container>
          {(categoryPosts.length==0 || categoryPosts===null) &&(
            <p className='text-center text-lg text-gray-500 font-bold'>
              No Posts found for this category
            </p>
          )}
        </Container>
      </Box>
    </div>
  )
}

export default CategoryPosts