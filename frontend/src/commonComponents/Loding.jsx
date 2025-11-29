import { Spinner, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import './commonComponent.css'

export default function Loding() {
  return (
    <div className='Loding'>
      <VStack colorPalette="teal">
      <Spinner color="blue.500" width={14} height={14} borderWidth="4px"/>
      <Text color="blue.500" fontWeight={800}>Loading please wait...</Text>
    </VStack>
    </div>
  )
}
