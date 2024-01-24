import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Image, List, ListItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Spacer, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { MdAccountCircle} from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from '../context/UserContext';

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {curruentUser, setCurruentUser} = React.useContext(UserContext);
  const token = curruentUser?.token;
  const {id} = curruentUser;
  console.log(id);

  
  return (
    <Box height={"55px"} width={"100%"} backgroundColor={"gray.200"} position={"fixed"} zIndex={10} shadow={"md"}>
        <Flex alignItems={"center"} width={"100%"} height={"100%"} paddingX={"20px"} py={"8px"}>
            <Link to="/">
              <Image
                src='/public/logo.png'
                alt='logo.png'
                width={"40px"}
                height={"40px"}
              />
            </Link>
            <Spacer/>

            {
              curruentUser!==null &&(
                <Flex 
              gap={"4px"} 
              direction={"row"}
              display={{base:"none", sm:"none", md:"flex"}}
            >
              <List className="font-semibold text-[16px] flex gap-4 items-center">
                <ListItem>
                  <Link to="/">Home</Link>
                </ListItem>
                <ListItem>
                  <Link to="create">Create Post</Link>
                </ListItem>
                <ListItem>
                  <Link to="authors">Authors</Link>
                </ListItem>
                <ListItem >
               
                    <Popover>
                      <PopoverTrigger>
                        <ListItem>
                          <MdAccountCircle color='gray' className="w-10 h-8 cursor-pointer" />
                        </ListItem>
                      </PopoverTrigger>

                      {/* <Portal> */}
                        <PopoverContent className='z-50'>
                          <PopoverArrow/>
                          <PopoverCloseButton/>
                          <PopoverHeader>
                            <h1 className='text-[16px]'>Hello Username!</h1>
                            <h3 className='text-sm text-gray-400'>user@mail.com</h3>
                          </PopoverHeader>
                          <PopoverBody>
                            <List spacing={"6px"} className="text-[16px]">
                              <ListItem className="hover:bg-gray-100" onClick={onclose}>
                                <Link to={`/profile/${id}`}>View Profile</Link>
                              </ListItem>
                        
                              <ListItem className="flex w-full gap-2 items-center hover:bg-gray-100">
                                <RiLogoutBoxRLine color='red'/>
                                <Link to="logout"><p className="text-red-500 w-full">Logout</p></Link>
                              </ListItem>
                            </List>
                          </PopoverBody>
                        </PopoverContent>
                      {/* </Portal> */}
                    </Popover>
                
                </ListItem>
              </List>
            </Flex>
              )}

            {
              curruentUser === null &&(
                <Flex 
                  gap={"4px"} 
                  direction={"row"}
                  display={{base:"none", sm:"none", md:"flex"}}
                >
    
                <List className="font-semibold text-[16px] flex gap-4 items-center">
                  <ListItem>
                    <Link to="/">Home</Link>
                  </ListItem>
                  
                  <ListItem>
                    <Link to="authors">Authors</Link>
                  </ListItem>
                  <ListItem >
                 
                      <Popover>
                        <PopoverTrigger>
                          <ListItem>
                            <MdAccountCircle color='gray' className="w-10 h-8 cursor-pointer" />
                          </ListItem>
                        </PopoverTrigger>
  
                        {/* <Portal> */}
                          <PopoverContent className='z-50'>
                            <PopoverArrow/>
                            <PopoverCloseButton/>
                            <PopoverHeader>
                              <h1 className='text-[16px]'>Login to add posts</h1>
                           
                            </PopoverHeader>
                            <PopoverBody>
                              <List spacing={"6px"} className="text-[16px]">                          
                                <ListItem className="flex w-full gap-2 items-center hover:bg-gray-100">
                                  <RiLogoutBoxRLine color='blue'/>
                                  <Link to="/login"><p className="text-blue-500 w-full">Login</p></Link>
                                </ListItem>
                              </List>
                            </PopoverBody>
                          </PopoverContent>
                        {/* </Portal> */}
                      </Popover>
                  
                  </ListItem>
                </List>
              </Flex>
              )
            }
              
               
            <Flex display={{base:"flex", sm:"flex", md:"none"}}>
                <GiHamburgerMenu 
                  color={"gray"} 
                  size={"30px"} 
                  onClick={onOpen} 
                  className='hover:cursor-pointer'
                />
                <Drawer isOpen={isOpen} onClose={onClose}>
                  <DrawerOverlay/>
                  <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>
                      <h1 className='text-[20px] font-bold'>Tech-Sposure</h1>
                    </DrawerHeader>
                    <DrawerBody>
                        
                          {
                            curruentUser!== null && (
                              <List 
                                className="font-semibold text-[16px] flex flex-col gap-4 justify-center"
                                onClick={onClose}>
                                  <ListItem>
                                    <Link to="/">Home</Link>
                                  </ListItem>
                                  <ListItem>
                                    <Link to="create">Create Post</Link>
                                  </ListItem>
                                  <ListItem>
                                    <Link to="authors">Authors</Link>
                                  </ListItem>
                                </List>
                        
                            )
                          }
                          {
                            curruentUser === null &&(
                              <List 
                              className="font-semibold text-[16px] flex flex-col gap-4 justify-center"
                              onClick={onClose}>
                                <ListItem>
                                  <Link to="/">Home</Link>
                                </ListItem>
                                <ListItem>
                                  <Link to="authors">Authors</Link>
                                </ListItem>
                              </List>
                            )
                          }
                         
                    </DrawerBody>
                    <DrawerFooter>
                      {
                        curruentUser!== null && (
                          <>
                            <Link to="/profile/123">
                              <Button colorScheme='blue' onClick={onClose}>View Profile</Button>
                            </Link>
                            
                            <Link to="/logout">
                              <Button variant='outline' mr={3}>
                                 Logout
                               </Button>
                            </Link>
                          </>
                        )
                      }
                      {
                        curruentUser === null &&(
                          <>
                            <Link to="/login">
                              <Button colorScheme='blue' onClick={onClose}>Login</Button>
                            </Link>
                          </>
                        )
                      }
                 
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
            </Flex>
        </Flex>
        
    </Box>
  )
}

export default Header