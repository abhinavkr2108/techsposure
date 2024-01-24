import React from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Center,
} from '@chakra-ui/react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



function Footer() {
  const navigate = useNavigate();

  const webDevCategories = [
    {
      id:1,
      title:'HTML',
    },
    {
      id:2,
      title:'CSS',
    },
    {
      id:3,
      title:'Javascript',
    },
    {
      id:4,
      title:'React',
    },
    {
      id:5,
      title:'Typescript',
    },
    {
      id:6,
      title:'Angular',
    },
    {
      id:7,
      title:'Vue',
    },
  ];
  const mobileDevCategories = [
    {
      id:1,
      title:'Kotlin',
    },
    {
      id:2,
      title:'Java',
    },
    {
      id:3,
      title:'Jetpack Compose',
    },
    {
      id:4,
      title:'React Native',
    },
    {
      id:5,
      title:'Flutter',
    },
  ];
  const devopsCategories = [
    {
      id:1,
      title:'Docker',
    },
    {
      id:2,
      title:'Kubernetes',
    },
  ];
  const backendCategories = [
    {
      id:1,
      title:'NodeJS',
    },
    {
      id:2,
      title:'Express',
    },
    {
      id:3,
      title:'Django',
    },
    {
      id:4,
      title:'SpringBoot',
    }
  ];

  const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    )
  }

  return (
    <div>
      <Box
      bg={useColorModeValue('gray.200', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
        <Center>
          <Text fontSize={'20px'}  marginTop={"12px"} fontWeight={"bold"}>
            Browse Popular Categories
          </Text>
        </Center>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Web Development</ListHeader>
            {webDevCategories.map((category) => (
              <Box as="a" 
                onClick={() => navigate(`posts/categories/${category.title}`,{state: {category: category.title}})}
                key={category.id}
                cursor={'pointer'}
              >
                  {category.title}
              </Box>
            ))}
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Mobile App Development</ListHeader>
              {mobileDevCategories.map((category) => (
                <Box as="a" 
                onClick={() => navigate(`posts/categories/${category.title}`,{state: {category: category.title}})}
                key={category.id}
                cursor={'pointer'}
              >
                  {category.title}
                </Box>
              ))}
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Devops</ListHeader>
              {devopsCategories.map((category)=>(
                <Box as="a"
                  onClick={() => navigate(`posts/categories/${category.title}`,{state: {category: category.title}})}
                  key={category.id}
                  cursor={'pointer'}
                >
                    {category.title}
                </Box>
              ))}
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Backend and Database</ListHeader>
            {backendCategories.map((category)=>(
              <Box as="a" 
              onClick={() => navigate(`posts/categories/${category.title}`,{state: {category: category.title}})}
              key={category.id}
              cursor={'pointer'}
            >
                {category.title}
              </Box>
            ))}
          </Stack>

        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.300', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text>© 2024 Tech-Sposure. All rights reserved</Text>
          
        </Container>
      </Box>
    </Box>
    </div>
  )
}

export default Footer