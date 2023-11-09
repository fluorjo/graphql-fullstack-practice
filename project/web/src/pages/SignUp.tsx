// project/web/src/pages/SignUp.tsx

import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import CommonLayout from '../components/CommonLayout'
import SignUpForm from '../components/auth/SignUpForm'

function SignUp(): React.ReactElement {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')}>
      <CommonLayout>
        <Flex align={'center'} justify={'center'}>
          <SignUpForm />
        </Flex>
      </CommonLayout>
    </Box>
  )
}
export default SignUp
