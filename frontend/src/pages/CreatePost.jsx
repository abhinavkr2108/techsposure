import { Alert, AlertIcon, Box, Button, Container, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import React from 'react'
import JoditEditor from 'jodit-react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePost() {
  const editor = React.useRef(null);

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState();
  const [image, setImage] = React.useState(null);
  const [error, setError] = React.useState("");

  const {curruentUser, setCurruentUser} = React.useContext(UserContext);
  const navigate = useNavigate();
  const token = curruentUser?.token;


  React.useEffect(()=>{
    if(!token){
      navigate("/login");
    }
  },[]);

  const createPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image", image);
    postData.append("category", category); 
    console.log("POST DATA");
    console.log(postData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_POST_BASE_URL}/create-post`,postData, {
    
        headers: {Authorization: `Bearer ${token}`, 'Content-Type':'multipart/form-data'}

      });
      console.log(response);
      navigate("/");

    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
    }
  }

  return (
    <div className='pt-12 h-[80vh] w-full flex flex-col items-center'>
      <Heading>
        Add New Post
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
          <form onSubmit={createPost} className='flex flex-col gap-3'>
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
            <Button variant={"solid"} colorScheme='blue' alignSelf={"flex-start"} px={6} type='submit'>Add Post</Button>
          </form>
        </Box>
      </Container>
    </div>
  )
}

export default CreatePost