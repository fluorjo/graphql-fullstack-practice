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
import { useForm } from 'react-hook-form'
import { LoginMutationVariables } from '../../generated/graphql'

export function RealLoginForm(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginMutationVariables>()

  const onSubmit = (formData: LoginMutationVariables) => {
    console.log(formData)
  }

  return (
    <Box
      rounded="lg"
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow="lg"
      p={8}
    >
      <Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.loginInput?.emailOrUsername}>
          <FormLabel>email or id</FormLabel>
          <Input
            type="emailOrUsername"
            placeholder="Enter your email or id"
            {...register('loginInput.emailOrUsername', {
              required: 'Enter your email address.',
            })}
          />
          <FormErrorMessage>
            {errors.loginInput?.emailOrUsername &&
              errors.loginInput.emailOrUsername.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.loginInput?.password}>
          <FormLabel>password</FormLabel>
          <Input
            type="password"
            placeholder="*********"
            {...register('loginInput.password', {
              required: 'Enter your password',
            })}
          />
          <FormErrorMessage>
            {errors.loginInput?.password && errors.loginInput.password.message}
          </FormErrorMessage>
        </FormControl>
        <Divider />
        <Button colorScheme="teal" type="submit">
          Login
        </Button>
      </Stack>
    </Box>
  )
}
function LoginForm(): React.ReactElement {
  return (
    <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl">지브리 명장면 프로젝트</Heading>
        <Text fontSize="lg" color="gray.600">
          감상평과 좋아요를 눌러보세요!
        </Text>
      </Stack>
      <RealLoginForm/>
    </Stack>
  )
}

export default LoginForm
