import { Avatar, AvatarBadge,Heading,Container, Button, Input, FormControl, Box, Alert, AlertIcon } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { FaPen, FaCheck } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

function UserProfile() {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState();
  const [initialImage, setInitialImage] = useState("https://bit.ly/broken-link");
  const [userAvatar, setUserAvatar] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const {curruentUser, setCurruentUser} = React.useContext(UserContext);
  const token = curruentUser?.token;
  const {id} = curruentUser;

  const navigate = useNavigate();

  const openFileExplorer = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
    const file = event.target.files[0];
    setImage(file);
    console.log(file);
    setUserAvatar(file);
  }
  const handleViewPosts = () =>{
    navigate(`/myposts/${curruentUser.id}`);
  }

  const getUserDetailsById = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_USER_BASE_URL}/find/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data);
      setUserName(data.user.name);
      setUserEmail(data.user.email);
      setUserAvatar(data.user.avatar);
      // setCurruentUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  const updateUserDetails = async () => {
    const updatedPostData = new FormData();
    updatedPostData.append("name", userName);
    updatedPostData.append("email", userEmail);
    updatedPostData.append("currentPassword", userPassword);
    updatedPostData.append("newPassword", newPassword);
    updatedPostData.append("confirmNewPassword", confirmNewPassword);

    try {
      const response = axios.patch(`${import.meta.env.VITE_USER_BASE_URL}/edit-user`, updatedPostData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
      })
      navigate("/");
    } catch (error) {
      error.response.data.message && setError(error.response.data.message);
      console.error(error);
    }

  }

  const changeAvatar = async () => {
    const avatar = new FormData();
    avatar.append("avatar", userAvatar);
    console.log("UPDATED AVATAR");
    console.log(avatar);

    try {
      const response = await axios.post(`${import.meta.env.VITE_USER_BASE_URL}/change-avatar`, avatar,
       {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
      });
      console.log("RESPONSE");
      console.log(response);
      // setUserAvatar(`${import.meta.env.VITE_UPLOADS_URL}/${response.data.updatedUser.avatar}`);
      setInitialImage(`${import.meta.env.VITE_UPLOADS_URL}/${response.data.updatedUser.avatar}`);
      console.log("UPDATED USER AVATAR");
      console.log(`${import.meta.env.VITE_UPLOADS_URL}/${response.data.updatedUser.avatar}`);

    } catch (error) {
      if (error.response.data.message) {
        setError(error.response.data.message);
      } 
      else{
        setError("Something went wrong");
      }
      console.error(error);
    }
  }


  // console.log("CURRUENT USER", curruentUser);
  React.useEffect(()=>{
    if(!token){
      navigate("/login");
    }
  },[]);

  React.useEffect(()=>{
    console.log("AVATAR STATE");
    console.log(userAvatar);
    if(userAvatar){
      changeAvatar();
    }
  },[image])

  React.useEffect(()=>{
    getUserDetailsById();
  },[])
  

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={openFileExplorer}
        style={{ display: 'none' }} 
        accept='image/*'
      />

        <Avatar size={"2xl"} src={userAvatar? `${import.meta.env.VITE_UPLOADS_URL}/${userAvatar}` : initialImage}>
            <AvatarBadge
              boxSize='1em'
              bg='blue.500'w-full flex justify-center items-center
              borderColor={'blue.500'}
              className='cursor-pointer'
              onClick={()=>fileInputRef.current.click()}
            >
                 <FaPen size={20}/>
            </AvatarBadge>
        </Avatar>
        <Heading mt={5}>
          {userName}
        </Heading>
        <Button 
          variant={"ghost"}
          colorScheme='blue'
          onClick={handleViewPosts}
        >
          View All Posts
        </Button>

        {
            error && (
              <Box w={"40%"}>
                <Alert status='error'>
                  <AlertIcon />
                  {error}
                </Alert>
              </Box>
            )
          }

   
          <form className='flex flex-col w-full items-center gap-3 mt-5' onSubmit={updateUserDetails}>
            <Input
              placeholder='Name'
              bgColor={"white"}
              w={{base: "90%", sm:"80%",md:"40%"}}
              onChange={e=>setUserName(e.target.value)}
              value={userName}
            />
             <Input
              placeholder='Email'
              bgColor={"white"}
              w={{base: "90%", sm:"80%",md:"40%"}}
              onChange={e=>setUserEmail(e.target.value)}
              value={userEmail}
            />
            <Input 
              placeholder='Current Password' 
              type='password' 
              bgColor={"white"} 
              w={{base: "90%", sm:"80%",md:"40%"}}
            />
            <Input 
              placeholder='New Password' 
              type='password' 
              bgColor={"white"} 
              w={{base: "90%", sm:"80%",md:"40%"}}
            />
            <Input 
              placeholder='Confirm New Password' 
              type='password' 
              bgColor={"white"} 
              w={{base: "90%", sm:"80%",md:"40%"}}
            />
             <Button 
                variant={"solid"} 
                colorScheme='blue' 
                w={{base: "90%", sm:"80%",md:"40%"}}
                type='submit'
              >
                Update Profile
              </Button>
          </form>

        
    </div>
  )
}

export default UserProfile