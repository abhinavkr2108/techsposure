import { Center, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { dummyAuthorPosts } from '../data/SamplePosts';
import PostItem from '../Components/PostItem';
import axios from 'axios';

function AuthorPost() {
  const location = useLocation();
  console.log("LOCATION");
  console.log(location);
  const post = location.state.post;
  console.log("POST");
  console.log(post);

  const [authorPosts, setAuthorPosts] = React.useState([]);
  const [authorName, setAuthorName] = React.useState();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const getAuthorName = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_USER_BASE_URL}/find/${post}`);
      console.log("USER DATA TRIAL")
      console.log(response);
      const user = await response.data.user.name;
      if (user) {
        console.log("NAME OF USER:")
        console.log(user);
        setAuthorName(user);
      } else{
        setError("Something went wrong");
        return;
      }
    } catch (error) {
      console.error(error);
      // setError(error.response.data.message);
    }
  }

  React.useEffect(() => {
    getAuthorName();
  },[])

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_POST_BASE_URL}/users/${post}`);
        console.log("RESPONSE");
        console.log(response);
        console.log("RESPONSE DATA");
        const posts = await response.data.authorPosts;
        console.log(posts);
        setAuthorPosts(posts);
        setLoading(false);
      } catch (error) {
        // setError(error.response.data.message);
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
  },[])
  return (
    <div className='pt-12'>
      <Heading className='text-center'>
        Posts by {authorName}
      </Heading>
      <Container maxW={"8xl"} mx={"auto"} py={12}>
            <Center>
            <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg:3 }} spacing={8}>
            {
                authorPosts.map((post) => {
                    return (
                        <div key={post.id}>
                            <PostItem post={post}/>
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

export default AuthorPost