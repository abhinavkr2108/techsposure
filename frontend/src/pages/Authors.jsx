import { Center, Container, Heading, SimpleGrid } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import AuthorCard from '../Components/AuthorCard';
import { dummyUserData } from '../data/SamplePosts';
import axios from 'axios';
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';

function Authors() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const fetchAllAuthors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_USER_BASE_URL}/authors`);
      const data = await response.data;
      const authors = data.authors;
      setUsers(authors);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    if (loading) {
      return <Loader/>
    }
   
  }
  useEffect(() => {
    fetchAllAuthors();
  },[])
  return (
    <div className='pt-12'>
      <Heading  className='text-center'>
        Discover All Authors
      </Heading>

      <Container maxW={"8xl"} mx={"auto"} py={8}>
        <Center>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg:4 }} spacing={8}>
            {
              users.map((user) => {
                  return (
                    <div 
                      key={user.user_id} 
                      className='cursor-pointer'
                      onClick={() => {navigate(`/posts/users/${user._id}`,{state: {post: user._id}})}}
                    >
                      <AuthorCard user={user}/>
                    </div>
                  )
              })
            }
          </SimpleGrid>
        </Center>
      </Container>
    </div>
  )
}

export default Authors