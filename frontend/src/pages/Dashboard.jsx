import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Card, CardBody, Flex, Heading, Image, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { dummyAuthorPosts } from '../data/SamplePosts';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import DeleteDialog from '../Components/DeleteDialog';

function Dashboard() {
  const [authorPosts, setAuthorPosts] = React.useState([]);

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const {curruentUser, setCurruentUser} = React.useContext(UserContext);
  const token = curruentUser?.token;
  const {id} = useParams();
  console.log(id);

  React.useEffect(()=>{
    if(!token){
      navigate("/login");
    }
  },[]);

  React.useEffect(()=>{
    if(id){
      getAuthorPosts();
    }
  },[])

  const getAuthorPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_POST_BASE_URL}/users/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      const posts = await response.data;
      console.log("MY POSTS");
      console.log(posts);
      setAuthorPosts(posts.authorPosts);
    } catch (error) {
      console.error(error);
    }
  }

  // On Clicks
  const viewPost = (post) => {
    navigate(`/posts/${post._id}`, {state:{post:post}});
  }
  const editPost = (post) => {
    navigate(`/posts/${post._id}/edit`, {state:{post:post}});
  }
  const deletePost = () => {
    onOpen();
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Post!
              </AlertDialogHeader>
              <AlertDialogBody>
              Are you sure you want to delete this post? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>

        </AlertDialog>
      </>
    )
  }
  
  return (
    <div className='pt-12 h-screen w-full flex flex-col items-center'>
      <Heading mb={5}>Your Posts</Heading>
      {
        authorPosts.map((post) => {
          return (
            <div key={post.id} className='w-full flex flex-col gap-2 justify-center items-center'>
              <Card rounded={"md"} w={"80%"} my={2}>
                <CardBody>
                  <Flex alignItems={"center"} gap={3}>
                    <Image
                      w={"60px"}
                      h={"40px"}
                      rounded={"md"}
                      src={`${import.meta.env.VITE_UPLOADS_URL}/${post.image}`}
                    />
                    <Text className='text-[16px] font-semibold'>
                      {post.title}
                    </Text>
                    <Spacer/>
                    <Button colorScheme='blue' variant={"ghost"} onClick={()=>viewPost(post)}>View</Button>
                    <Button colorScheme='blue' variant={"solid"} onClick={()=>editPost(post)}>Edit</Button>
                    <DeleteDialog post={post}/>
                  </Flex>
                </CardBody>
              </Card>
            </div>
          )
        })
      }

    </div>
  )
}

export default Dashboard