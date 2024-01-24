import { Box, Heading,Text, Container, Input, FormControl, Button, Image, AlertIcon, Alert } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx';

function LoginPage() {
  //Navigation
  const navigate = useNavigate();

  //context
  const {curruentUser, setCurruentUser} = React.useContext(UserContext);
  
  // State variables
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  //Functions
  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => {
      return {
       ...prevState,
        [name]: value,
      };
    });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_USER_BASE_URL}/login`, userData);
      const user = await response.data;

      if (user) {
        console.log(user);
        setCurruentUser(user);
        navigate("/");
      } else{
        setError("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  }

  return (
   <Box 
      bgColor={"gray.50"}
      className='h-screen w-full flex justify-center items-center'
    >
        <Box w={"full"}>
          <Container>
            <Image src='/public/logo.png' 
              alt='logo.png'
              width={"50px"}
              height={"50px"}
            />
            <Heading fontWeight={"bold"} fontSize={"2xl"} mt={2}>
              Welcome Back!
            </Heading>
            <Text className="text-gray-500 font-semibold text-lg my-2">
              Please login to continue
            </Text>

            {
            error && (
              <Alert status='error'>
                <AlertIcon />
                {error}
              </Alert>
            )
          }

            <FormControl mt={4}>
              <form className='flex flex-col gap-3'onSubmit={loginUser}>
                <Input 
                  placeholder='Email'  
                  bgColor={"white"}
                  onChange={changeInputHandler} name='email'
                  value={userData.email}
                />
                <Input 
                  placeholder='Password' 
                  bgColor={"white"}
                  type='password'
                  onChange={changeInputHandler} name='password'
                  value={userData.password}
                />
                <Button variant={"solid"} colorScheme='blue' type='submit'>Login</Button>
              </form>
            </FormControl>
            <Text mt={4} fontSize={"14px"}>
              Don't have an account? <Link to='/register'><span className='text-blue-500 font-semibold'>Create Account</span></Link>
            </Text>
          </Container>
  
        </Box>

   </Box>
  )
}

export default LoginPage