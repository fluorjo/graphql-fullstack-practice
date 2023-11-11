//project/web/src/components/auth/LoginForm.tsx

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import React from 'react'

function LoginForm(): React.ReactElement {
  return (
    <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl">지브리 명장면 프로젝트</Heading>
        <Text fontSize="lg" color="gray.600">
          감상평과 좋아요를 눌러보세요!
        </Text>
      </Stack>
      <Box>아이디 비번 입력</Box>
    </Stack>
  )
}
export default LoginForm
