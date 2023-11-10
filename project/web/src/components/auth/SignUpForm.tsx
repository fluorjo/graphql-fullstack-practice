//project/web/src/components/auth/SignUpForm.tsx

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
  useToast,
} from '@chakra-ui/react'

import {
  SignUpMutationVariables,
  useSignUpMutation,
} from '../../generated/graphql'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function SignUpRealForm() {
  const [signUp, { loading }] = useSignUpMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpMutationVariables>()
  const navigate = useNavigate()
  const toast = useToast()

  const onSubmit = async (data: SignUpMutationVariables) => {
    const { signUpInput } = data
    return signUp({ variables: { signUpInput } })
      .then((res) => {
        if (res.data?.signUp) {
          toast({ title: 'welcome~~~~`', status: 'success' })
          navigate('/')
        } else {
          toast({
            title: '에러 발생',
            status: 'error',
          })
        }
      })
      .catch((err) => {
        toast({ title: 'This email or id is already in use', status: 'error' })
        return err
      })
  }

  return (
    <Stack
      as="form"
      spacing={4}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <FormControl isInvalid={!!errors.signUpInput?.email}>
        <FormLabel>이메일</FormLabel>
        <Input
          type="email"
          placeholder="example@example.com"
          {...register('signUpInput.email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value:
                // eslint-disable-next-line max-len
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: '이메일의 형식이 올바르지 않습니다.',
            },
          })}
        />
        <FormErrorMessage>
          {errors.signUpInput?.email && errors.signUpInput.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.signUpInput?.username}>
        <FormLabel>ID</FormLabel>
        <Input
          type="text"
          placeholder="example"
          {...register('signUpInput.username', {
            required: '아이디를 입력해주세요.',
          })}
        />
        <FormErrorMessage>
          {errors.signUpInput?.username && errors.signUpInput.username.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.signUpInput?.password}>
        <FormLabel>password</FormLabel>
        <Input
          type="password"
          placeholder="8자 이상 영문, 숫자, 특수문자"
          {...register('signUpInput.password', {
            required: '암호를 입력해주세요.',
            min: { value: 8, message: '비밀번호는 8자 이상이어야 합니다.' },
            pattern: {
              value:
                // eslint-disable-next-line max-len
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
              message:
                '암호는 문자,숫자,특수문자를 포함한 8자 이상이어야 합니다.',
            },
          })}
        />
        <FormErrorMessage>
          {errors.signUpInput?.password && errors.signUpInput.password.message}
        </FormErrorMessage>
      </FormControl>
      <Divider />
      <Button colorScheme="teal" type="submit" isLoading={loading}>
        계정 생성
      </Button>
    </Stack>
  )
}

export default function SignUpForm(): React.ReactElement {
  return (
    <Stack spacing={8} mx={'auto'} maxW={'1g'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize="4xl">프로젝트 지브리</Heading>
        <Text fontSize="1g" color="gray.600">
          welcome!
        </Text>
      </Stack>
      <Box
        rounded={'1g'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'1g'}
        minW={'1g'}
        p={8}
      >
        <SignUpRealForm />
      </Box>
    </Stack>
  )
}
