import React from 'react'
import { Badge, Box, Button, Card, HStack, Image } from "@chakra-ui/react"
import { useColorMode } from '@chakra-ui/color-mode';

export default function TaskCard() {
    const { colorMode } = useColorMode();
  return (
    <Card.Root bgColor={colorMode=='light' ? 'white' : 'blue.900'} borderColor={colorMode=='dark' && 'gray.600'}>
    <Box>
      <Card.Body>
        <Card.Title mb="2" color={colorMode=='light' ? 'black' : 'white'}>The perfect latte</Card.Title>
        <Card.Description color={colorMode=='dark' && 'gray.300'}>
          Caffè latte is a coffee beverage of Italian origin made with espresso
          and steamed milk.
        </Card.Description>
        <HStack mt="4">
          <Badge bgColor={'green.500'}>Completed</Badge>
        </HStack>
      </Card.Body>
      <Card.Footer>
        <Button bgColor={'blue.500'}>Edit</Button>
        <Button bgColor={'red.500'}>Delete</Button>
      </Card.Footer>
    </Box>
  </Card.Root>
  )
}
