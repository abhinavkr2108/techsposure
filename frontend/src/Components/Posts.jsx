import { Box, Center, Container, SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import PostItem from './PostItem';
import axios from 'axios';
import Loader from './Loader';

export default function Posts() {
    const dummyPosts = [
        {
            id: 1,
            title: 'Post 1',
            author: 'Author 1',
            authorImg: 'https://picsum.photos/seed/picsum/50/50',
            date: Date.now(),
            category: 'Category 1',
            image: 'https://picsum.photos/seed/picsum/400/270',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <br/> <br/> Lorem ipsum',
            authorId: 1,
        },
        {
            id: 2,
            title: 'Title of Second Post',
            author: 'Author 2',
            category: 'Javascript',
            authorImg: 'https://picsum.photos/seed/picsum/50',
            date: Date.now(),
            image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <br/> <br/> Lorem ipsum',
            authorId: 2,
        },
        {
            id: 3,
            title: 'Title of Third Post',
            author: 'Author 3',
            category: 'React',
            image: 'https://picsum.photos/seed/picsum/400/270',
            authorImg: 'https://picsum.photos/seed/picsum/50',
            date: Date.now(),
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <br/> <br/> Lorem ipsum',
            authorId: 3,
        },
        {
            id: 4,
            title: 'Title of Fourth Post',
            author: 'Author 4',
            category: 'React',
            image: 'https://picsum.photos/seed/picsum/400/270',
            authorImg: 'https://picsum.photos/seed/picsum/50',
            date: Date.now(),
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <br/> <br/> Lorem ipsum',
            authorId: 4,
        },
        {
            id: 5,
            title: 'Title of Fifth Post',
            author: 'Author 4',
            category: 'NextJS',
            image: 'https://picsum.photos/seed/picsum/400/270',
            authorImg: 'https://picsum.photos/seed/picsum/50',
            date: "12/1/24",
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <br/> <br/> Lorem ipsum',
            authorId: 5,
        },
        {
            id: 6,
            title: 'Title of Sixth Post',
            author: 'Author 6',
            category: 'Docker',
            image: 'https://picsum.photos/seed/picsum/400/270',
            authorImg: 'https://picsum.photos/seed/picsum/50',
            date: Date.now(),
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <br/> <br/> Lorem ipsum',
            authorId: 6,
        },
    ];

    const  [posts, setPosts] = React.useState([]);
    const  [isLoading, setIsLoading] = React.useState(false);
    const  [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_POST_BASE_URL}/all-posts`);
                console.log(response);
                setPosts(response?.data?.posts);
            } catch (err) {
                setError(err);
                console.log(err);
            }
            setIsLoading(false);
        };
        fetchPosts();
    },[])

    if(isLoading){
        return <Loader/>
    }
  return (
    <Box bgColor={"gray.50"}>

        <Container maxW={"8xl"} mx={"auto"} py={12}>
            <Center>
            <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg:3 }} spacing={8}>
            {
                posts.map((post) => {
                    return (
                        <div key={post._id}>
                            <PostItem post={post}/>
                        </div>
                    )
                })
            }
            </SimpleGrid>
            </Center>
        </Container>
        
    </Box>
  )
}
