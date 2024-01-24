import { Box, Heading,Text, Container, Input, FormControl, Button, Image, Alert, AlertIcon } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
  const navigate = useNavigate();
  // State Variables
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

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

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_USER_BASE_URL}/register`, userData);
      console.log(response);
      const user = await response.data;
      if (user) {
        console.log(user);
        navigate("/login");
      } else{
        setError("Something went wrong");
        return;
      }
  
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
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
            Welcome To Tech-Sposure!
          </Heading>
          <Text className="text-gray-500 font-semibold text-lg my-2">
            Create a new account to share your tech blogs
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
            <div >
              <form onSubmit={registerUser} className='flex flex-col gap-3'>
                <Input 
                  placeholder='Name' 
                  bgColor={"white"} 
                  onChange={changeInputHandler} name='name' 
                  value={userData.name}
                />
                <Input 
                  placeholder='Email' 
                  type='email' 
                  bgColor={"white"}
                  onChange={changeInputHandler} name='email'
                  value={userData.email}
                />
                <Input 
                  placeholder='Password' 
                  type='password' 
                  bgColor={"white"}
                  onChange={changeInputHandler} name='password'
                  value={userData.password}
                />
                <Input 
                  placeholder='Confirm Password' 
                  type='password' 
                  bgColor={"white"}
                  onChange={changeInputHandler} name='confirmPassword'
                  value={userData.confirmPassword}
                />
                <Button variant={"solid"} colorScheme='blue' type='submit'>Create Account</Button>
              </form>
            </div>
          </FormControl>

          <Text mt={4} fontSize={"14px"}>
            Already have an account? <Link to='/login'><span className='text-blue-500 font-semibold'>Login</span></Link>
          </Text>
        </Container>

      </Box>

 </Box>
  )
}

export default Register