import { Avatar, Card, CardBody, Heading, Text, HStack, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'


export default function AuthorCard({user}) {
  
  return (
    <Card  
        rounded={"md"} 
        shadow={"sm"}
        direction={"row"}
    >
        <CardBody>
            <HStack align={"center"}>
                <Avatar src='https://bit.ly/broken-link' size={"sm"}/>
                <VStack align={"flex-start"} spacing={"2px"}>
                    <Heading size={"sm"}>{user.name}</Heading>
                    <Text>{user.postsNumber} Posts</Text>
                </VStack>
                
            </HStack>
        </CardBody>
    </Card>
  )
}
