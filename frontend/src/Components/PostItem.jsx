import { Avatar, Badge, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Spacer, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { RiAccountCircleFill } from 'react-icons/ri';
import { Link, useNavigate} from 'react-router-dom';
import ReactTimeAgo from'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function PostItem({post}) {
    
    // Variables
    const navigate = useNavigate();
    const [authorName, setAuthorName] = React.useState("");
    const [authorId, setAuthorId] = React.useState(post?.user);
    const [authorImage, setAuthorImage] = React.useState(null);

    //Functions
    const getAuthorName = async () => {
        const authorId = post?.user;
        const authorData = await axios.get(`${import.meta.env.VITE_USER_BASE_URL}/find/${authorId}`);
        const name = authorData.data.user.name;
        const image = authorData.data.user.avatar;
        setAuthorName(name);
        setAuthorImage(image);
    }

    const truncateContent = (content) => {
        return content.length > 150 ? `${content.substring(0, 150)}...` : content;
    }
    React.useEffect(()=>{
        getAuthorName();
    },[])
    const navigateToPostDetail = (postItem) => {
        navigate(`/posts/${postItem._id}`, {state: {post: postItem}});
    }
    const navigateToAuthorDetail = (postItem) => {
        navigate(`/posts/users/${authorId}`, {state: {post: postItem.user}});
    }
  return ( 
          <Card variant={"filled"} bgColor={"white"} maxW={"md"} rounded={"md"} zIndex={1}>
                <CardBody>
                    <Image src={`http://localhost:5000/uploads/${post.image}`} alt={"image"} rounded={"md"} width={"100%"} height={"200px"} />
                    <Badge variant={"solid"} px={2} py={1} colorScheme='blue' my={3}>{post.category}</Badge>
                    <Heading fontSize={"20px"}>{post.title}</Heading>
                    <Text fontSize={"16px"} mt={3} dangerouslySetInnerHTML={{__html: truncateContent(post.content)}}></Text>
                </CardBody>
                <CardFooter>
                    <Flex w={"full"}>
                        <Avatar src={authorImage? `${import.meta.env.VITE_UPLOADS_URL}/${authorImage}`:"https://bit.ly/broken-link"} size={"md"} alt={"image"} rounded={"full"} className='cursor-pointer' onClick={()=>navigateToAuthorDetail(post)}/>
                        <VStack ml={1} align={"flex-start"} className='cursor-pointer' onClick={()=>navigateToAuthorDetail(post)} spacing={"1px"}>
                            <Text className='text-[14px] font-bold'>{authorName}</Text>
                            <Text className='text-sm text-gray-500 font-semibold'>{<ReactTimeAgo date={new Date(post.createdAt)} locale='en-IN'/>}</Text>
                        </VStack>
                        <Spacer/>
                        <Button colorScheme='blue' variant={"ghost"} onClick={()=>navigateToPostDetail(post)}>Read More</Button>
                    </Flex>
                    
                </CardFooter>
            </Card>
  )
}
