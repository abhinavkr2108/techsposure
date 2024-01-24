import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Alert, AlertIcon, Box, Button, Container, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import axios from 'axios';

function EditPost() {

  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state.post;
  // console.log("LOCATION");
  // console.log(location);
  const {curruentUser, setCurruentUser} = React.useContext(UserContext);
  const token = curruentUser?.token;
  const {id} = useParams();

  const editor = React.useRef(null);

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState();
  const [image, setImage] = React.useState(null);
  const [error, setError] = React.useState("");


  React.useEffect(()=>{
    if(!token){
      navigate("/login");
    }
  },[]);

  React.useEffect(()=>{
    if(location.state){
     
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
      setImage(post.image);
    }
  },[])

  const editPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image", image);
    postData.append("category", category);
    console.log("POST DATA");
    console.log(postData);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_POST_BASE_URL}/${post._id}`,postData, {
        headers: {Authorization: `Bearer ${token}`, 'Content-Type':'multipart/form-data'}
      })
      console.log(response);
      navigate("/");
    } catch (error) {
      error.response.data.message && setError(error.response.data.message);
      console.error(error);
    }
  }

  return (
    <div className='pt-12 h-[80vh] w-full flex flex-col items-center'>
      <Heading>
        Edit Post
      </Heading>
      <Container maxW={"5xl"} mx={"auto"} pt={8}>
        <Box className='w-full flex flex-col gap-4 items-center justify-center'>
        {
            error && (
              <Alert status='error'>
                <AlertIcon />
                {error}
              </Alert>
            )
          }
          <form onSubmit={editPost} className='flex flex-col gap-3'>
            <Input
              placeholder='Title'
              bgColor={"white"}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Input
              placeholder='Category'
              bgColor={"white"}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />
            <input type='file' onChange={(e) => setImage(e.target.files[0])} accept='image/*' />
            <Button variant={"solid"} colorScheme='blue' alignSelf={"flex-start"} px={6} type='submit'>Edit Post</Button>
          </form>
        </Box>
      </Container>
    </div>
  )
}

export default EditPost