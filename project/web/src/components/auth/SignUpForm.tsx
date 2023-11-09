//project/web/src/components/auth/SignUpForm.tsx

import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'

export default function SignUpForm(): React.ReactElement {
  return (
    <Stack spacing={8} mx={'auto'} maxW={'1g'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize="4xl">계정 생성</Heading>
        <Text fontSize="1g" color="gray.600">
          welcome!
        </Text>
      </Stack>
      <Box
        rounded={'1g'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'1g'}
        p={8}
      >
        입력창
      </Box>
    </Stack>
  )
}
