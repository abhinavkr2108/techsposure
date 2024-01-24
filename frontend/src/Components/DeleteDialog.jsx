import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function DeleteDialog({post}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const navigate = useNavigate();
    const {curruentUser, setCurruentUser} = React.useContext(UserContext);
    const token = curruentUser?.token;
  
    React.useEffect(()=>{
      if(!token){
        navigate("/login");
      }
    },[]);
  

    useEffect(()=>{
        console.log(post);
    },[])

    const deletePost = () => {

        try {
            const response = axios.delete(`${import.meta.env.VITE_POST_BASE_URL}/${post._id}`, 
            {headers: {Authorization: `Bearer ${token}`}});
            window.location.reload();

        } catch (error) {
            console.error(error);

        }
   
    }

    return(
        <>
        <Button colorScheme='red' onClick={onOpen}>
             Delete
        </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this post? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deletePost} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        </>
    )
}
