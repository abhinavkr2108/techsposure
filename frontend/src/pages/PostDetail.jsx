import { Card, Image, CardBody, Box, Center, Heading, Text, Container } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function PostDetail() {
  const location = useLocation();
  const post = location.state.post;
  console.log("LOCATION");
  console.log(location);
  console.log("POSTS")
  console.log(post);


  useEffect(()=>{
    console.log(post);
  },[])

  return (
    <Box bg={"gray.50"} py={12}>
      <Container maxW={"6xl"} marginX={"auto"}>
        <Card bgColor={"white"} mx={"auto"} rounded={"md"} zIndex={1}>
          <CardBody>
            <Center>
              <Image
                  w={{base:"500px", md:"80%"}}
                  h={{base:"300px", md:"500px"}}
                  rounded={"md"}
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={"image"}
                  objectFit={"contain"}
                />
              </Center>
            <Center>
            <Heading my={8}>
              {post.title}
            </Heading>
            </Center>
            <Text dangerouslySetInnerHTML={{__html: post.content}}>
              {/* {post.content} */}
            </Text>
          </CardBody>
        </Card>
      </Container>
    </Box>
  )
}

export default PostDetail